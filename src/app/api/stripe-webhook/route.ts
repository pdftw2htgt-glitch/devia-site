import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

// Cle lisible a recopier a la main : DEVIA-XXXX-XXXX-XXXX.
// L alphabet exclut 0/O et 1/I, qu on confond en lisant un mail.
function genererCle(): string {
  const alpha = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bloc = () => {
    let s = "";
    for (let i = 0; i < 4; i++) s += alpha.charAt(Math.floor(Math.random() * alpha.length));
    return s;
  };
  return "DEVIA-" + bloc() + "-" + bloc() + "-" + bloc();
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

  if (evt.type === "checkout.session.completed") {
    const session = evt.data.object as Stripe.Checkout.Session;
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

    const ins = await sb.from("licenses").insert({
      license_key: cle,
      user_id: null,
      installed_version: ref.installed_version,
      max_version: ref.max_version,
      subscription_status: ref.subscription_status,
      subscription_type: ref.subscription_type,
      subscription_expires_at: dansUnAn,
      stripe_purchase_id: session.id,
      stripe_customer_id: typeof session.customer === "string" ? session.customer : null,
    });
    if (ins.error) {
      console.error("[DEVIA] insertion licence :", ins.error.message);
      return NextResponse.json({ error: ins.error.message }, { status: 500 });
    }

    console.log("[DEVIA] licence creee " + cle + " pour " + (session.customer_details?.email || "acheteur inconnu"));
    return NextResponse.json({ recu: true, license_key: cle });
  }

  return NextResponse.json({ recu: true });
}
