import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomInt } from "crypto";

export const runtime = "nodejs";

// Cle lisible a recopier a la main : DEVIA-XXXX-XXXX-XXXX.
// L alphabet exclut 0/O et 1/I, qu on confond en lisant un mail.
// La cle vaut un mot de passe : elle est tiree par randomInt (generateur
// cryptographique de Node). Math.random est previsible pour qui en observe
// assez de sorties, il ne doit jamais fabriquer un secret.
function genererCle(): string {
  const alpha = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bloc = () => {
    let s = "";
    for (let i = 0; i < 4; i++) s += alpha.charAt(randomInt(alpha.length));
    return s;
  };
  return "DEVIA-" + bloc() + "-" + bloc() + "-" + bloc();
}

// Statuts Stripe -> statuts admis par la base (contrainte CHECK : none, active, cancelled,
// expired, past_due). "incomplete" (premier paiement pas encore passe) ne change rien.
function statutDevia(s: string): string | null {
  if (s === "active" || s === "trialing") return "active";
  if (s === "past_due" || s === "unpaid") return "past_due";
  if (s === "canceled" || s === "incomplete_expired" || s === "paused") return "cancelled";
  return null;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Reporte l etat d un abonnement de maintenance sur la ou les licences qu il couvre :
// celles qui portent deja son identifiant (une equipe en formule personnalisee peut en
// avoir plusieurs), sinon celle du compte qui l a souscrit (metadonnee user_id).
async function majMaintenance(sb: SupabaseClient, sub: Stripe.Subscription): Promise<string> {
  const statut = statutDevia(sub.status);
  if (statut === null) return "statut " + sub.status + " ignore";
  const idClient = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
  let lics = await sb.from("licenses").select("id, subscription_expires_at").eq("stripe_subscription_id", sub.id);
  if ((lics.error === null && lics.data && lics.data.length > 0) === false) {
    const idCompte = sub.metadata ? sub.metadata.user_id : undefined;
    if ((typeof idCompte === "string" && UUID.test(idCompte)) === false) return "aucune licence pour cet abonnement";
    lics = await sb.from("licenses").select("id, subscription_expires_at").eq("user_id", idCompte);
  }
  if (lics.error || lics.data === null || lics.data.length === 0) return "aucune licence trouvee";
  const article = sub.items && sub.items.data.length > 0 ? sub.items.data[0] : null;
  const finPeriode = article ? article.current_period_end : 0;
  let n = 0;
  for (const lic of lics.data) {
    const maj: Record<string, string | null> = {
      subscription_status: statut,
      subscription_type: "monthly",
      stripe_subscription_id: sub.id,
      stripe_customer_id: idClient,
      updated_at: new Date().toISOString(),
    };
    // Une licence a echeance (achat sur le site) reste ouverte tant que la maintenance est
    // payee : son echeance suit la periode payee, plus 7 jours de battement. Une licence
    // sans echeance n en recoit jamais.
    if (statut === "active" && lic.subscription_expires_at && finPeriode > 0) {
      const nouvelle = new Date((finPeriode + 7 * 24 * 3600) * 1000);
      if (nouvelle.getTime() > new Date(lic.subscription_expires_at).getTime()) maj.subscription_expires_at = nouvelle.toISOString();
    }
    const u = await sb.from("licenses").update(maj).eq("id", lic.id);
    if (u.error === null) n += 1;
    else console.error("[DEVIA] maintenance, mise a jour licence " + lic.id + " :", u.error.message);
  }
  console.log("[DEVIA] maintenance " + sub.id + " -> " + statut + " sur " + n + " licence(s)");
  return statut + " sur " + n + " licence(s)";
}

export async function POST(req: Request) {
  const cleStripe = process.env.STRIPE_SECRET_KEY || "";
  const secretWebhook = process.env.STRIPE_WEBHOOK_SECRET || "";
  const urlSupa = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const cleService = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (cleStripe === "" || secretWebhook === "" || urlSupa === "" || cleService === "") {
    return NextResponse.json({ error: "configuration incomplete" }, { status: 500 });
  }

  const stripe = new Stripe(cleStripe);

  // Le corps doit etre lu BRUT : la signature porte sur les octets exacts envoyes par Stripe.
  const brut = await req.text();
  const signature = req.headers.get("stripe-signature") || "";

  let evt: Stripe.Event;
  try {
    evt = stripe.webhooks.constructEvent(brut, signature, secretWebhook);
  } catch (e) {
    // Appel non signe par Stripe : c est exactement ce qu on veut rejeter, sinon n importe
    // qui obtiendrait une licence en appelant cette adresse.
    const msg = e instanceof Error ? e.message : "signature illisible";
    console.error("[DEVIA] webhook refuse :", msg);
    return NextResponse.json({ error: "signature invalide" }, { status: 400 });
  }

  // ===== MAINTENANCE : l etat de l abonnement suit la licence =====
  if (evt.type === "customer.subscription.created" || evt.type === "customer.subscription.updated" ||
      evt.type === "customer.subscription.deleted") {
    const sbM = createClient(urlSupa, cleService, { auth: { persistSession: false } });
    const resultat = await majMaintenance(sbM, evt.data.object as Stripe.Subscription);
    return NextResponse.json({ recu: true, maintenance: resultat });
  }

  if (evt.type === "checkout.session.completed") {
    const session = evt.data.object as Stripe.Checkout.Session;

    // Une session d abonnement (maintenance) ne cree pas de licence : elle met a jour celle
    // du compte. Avant, TOUTE session terminee fabriquait une licence.
    if (session.mode === "subscription") {
      const idAbo = typeof session.subscription === "string" ? session.subscription : (session.subscription ? session.subscription.id : "");
      if (idAbo === "") return NextResponse.json({ recu: true });
      const abo = await stripe.subscriptions.retrieve(idAbo);
      const sbM = createClient(urlSupa, cleService, { auth: { persistSession: false } });
      const resultat = await majMaintenance(sbM, abo);
      return NextResponse.json({ recu: true, maintenance: resultat });
    }
    // Seules nos sessions d achat de licence creent une licence : elles portent type=licence
    // (celles ouvertes juste avant cette version portent au moins l identifiant du compte).
    // Un lien de paiement ou un autre produit ne fabrique plus de licence.
    const typeSession = session.metadata ? session.metadata.type : undefined;
    const idRef = typeof session.client_reference_id === "string" ? session.client_reference_id : "";
    const sessionLicence = session.mode === "payment" &&
      (typeSession === "licence" || (typeSession === undefined && UUID.test(idRef)));
    if (sessionLicence === false) {
      console.log("[DEVIA] session " + session.id + " : ni licence ni maintenance, ignoree");
      return NextResponse.json({ recu: true });
    }
    // Un code promo a 100 % donne un total de 0 : Stripe repond alors no_payment_required.
    const regle = session.payment_status === "paid" || session.payment_status === "no_payment_required";
    if (regle === false) {
      console.log("[DEVIA] session non reglee, aucune licence creee");
      return NextResponse.json({ recu: true });
    }

    const sb = createClient(urlSupa, cleService, { auth: { persistSession: false } });

    // Deja traitee ? Stripe peut renvoyer le meme evenement plusieurs fois : sans ce controle,
    // un acheteur recevrait deux licences pour un seul paiement.
    const dejaLa = await sb
      .from("licenses")
      .select("license_key")
      .eq("stripe_purchase_id", session.id)
      .maybeSingle();
    if (dejaLa.data) {
      console.log("[DEVIA] licence deja creee pour cette session");
      return NextResponse.json({ recu: true, license_key: dejaLa.data.license_key });
    }

    // installed_version et max_version sont obligatoires et sans valeur par defaut :
    // on les reprend sur la licence la plus recente, qui est forcement coherente.
    const modele = await sb
      .from("licenses")
      .select("installed_version, max_version, subscription_status, subscription_type")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    const ref = modele.data;
    if (ref === null || ref === undefined) {
      console.error("[DEVIA] aucune licence existante a recopier : creation impossible");
      return NextResponse.json({ error: "aucun modele de licence" }, { status: 500 });
    }

    const cle = genererCle();
    const dansUnAn = new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString();

    // Le compte qui a paye (pose par /api/checkout). Si ce compte a deja une licence, la
    // nouvelle reste orpheline : sa cle s active a la main, comme avant.
    const idCompte = typeof session.client_reference_id === "string" ? session.client_reference_id : "";
    let proprietaire: string | null = null;
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idCompte)) {
      const sienne = await sb.from("licenses").select("id").eq("user_id", idCompte).limit(1);
      if (sienne.error === null && sienne.data && sienne.data.length === 0) proprietaire = idCompte;
    }

    // Prix reellement paye (centimes chez Stripe). Un code promo a 100 % donne 0 : c est
    // une vraie vente a 0 EUR, DEVIA Stats l affiche comme telle.
    const prixAchat = (typeof session.amount_total === "number") ? session.amount_total / 100 : null;
    const ligne = {
      license_key: cle,
      user_id: proprietaire,
      installed_version: ref.installed_version,
      max_version: ref.max_version,
      // Un achat seul n ouvre aucun abonnement de maintenance. Avant, le statut etait recopie
      // sur la derniere licence creee : apres une licence d essai "active", un acheteur
      // aurait eu une maintenance qu il n a pas payee.
      subscription_status: "none",
      subscription_type: null,
      subscription_expires_at: dansUnAn,
      stripe_purchase_id: session.id,
      stripe_customer_id: typeof session.customer === "string" ? session.customer : null,
    };
    let ins = await sb.from("licenses").insert({ ...ligne, prix_achat_eur: prixAchat });
    if (ins.error && ins.error.message.includes("prix_achat_eur")) {
      // Colonne pas encore creee dans Supabase : la vente passe avant la statistique.
      console.error("[DEVIA] colonne prix_achat_eur absente, licence creee sans le prix");
      ins = await sb.from("licenses").insert(ligne);
    }
    if (ins.error) {
      console.error("[DEVIA] insertion licence :", ins.error.message);
      return NextResponse.json({ error: ins.error.message }, { status: 500 });
    }

    console.log("[DEVIA] licence creee " + cle + " pour " + (session.customer_details?.email || "acheteur inconnu") +
      (proprietaire ? " (rattachee au compte)" : " (a activer avec la cle)"));
    return NextResponse.json({ recu: true, license_key: cle });
  }

  return NextResponse.json({ recu: true });
}
