import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

// Ouvre une session de paiement Stripe et renvoie l adresse vers laquelle envoyer l acheteur.
// Le MONTANT ne circule jamais depuis le navigateur : seul l identifiant du prix est transmis,
// donc personne ne peut s offrir DEVIA a un euro en bricolant la requete.
export async function POST(req: Request) {
  const cleStripe = process.env.STRIPE_SECRET_KEY || "";
  const idPrix = process.env.STRIPE_PRICE_ID || "";
  if (cleStripe === "" || idPrix === "") {
    return NextResponse.json({ error: "Stripe n est pas configure (.env.local)" }, { status: 500 });
  }

  const stripe = new Stripe(cleStripe);
  const origine = new URL(req.url).origin;

  // Langue envoyee par le bouton d achat. Elle ne sert qu a choisir les pages de retour :
  // un acheteur anglophone revient sur /en/merci, pas sur la page francaise.
  let prefixe = "";
  try {
    const corps = await req.json();
    if (corps && corps.lang === "en") prefixe = "/en";
  } catch {
    prefixe = "";
  }
  const enAnglais = prefixe === "/en";

  // Il faut un compte DEVIA pour acheter : le jeton de session envoye par le navigateur est
  // verifie aupres de Supabase (cle de service, cote serveur uniquement). Le webhook
  // rattachera la licence a ce compte, l acheteur n aura aucune cle a recopier.
  const urlSupa = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const cleService = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (urlSupa === "" || cleService === "") {
    return NextResponse.json({ error: "Supabase n est pas configure (.env.local)" }, { status: 500 });
  }
  const entete = req.headers.get("authorization") || "";
  const jeton = entete.startsWith("Bearer ") ? entete.slice(7) : "";
  const msgConnexion = enAnglais ? "Sign in to your DEVIA account to buy." : "Connectez-vous à votre compte DEVIA pour acheter.";
  if (jeton === "") return NextResponse.json({ error: msgConnexion, code: "connexion" }, { status: 401 });
  const sb = createClient(urlSupa, cleService, { auth: { persistSession: false } });
  const lu = await sb.auth.getUser(jeton);
  const compte = lu.data ? lu.data.user : null;
  if (lu.error || compte === null) return NextResponse.json({ error: msgConnexion, code: "connexion" }, { status: 401 });
  // Une licence par compte : activate_my_license refuse deja une deuxieme cle sur un compte.
  const existante = await sb.from("licenses").select("id").eq("user_id", compte.id).limit(1);
  if (existante.data && existante.data.length > 0) {
    return NextResponse.json({
      error: enAnglais
        ? "This account already has a DEVIA licence. For another licence, please contact us."
        : "Ce compte a déjà une licence DEVIA. Pour une licence de plus, contactez-nous.",
      code: "deja_licence",
    }, { status: 409 });
  }

  // DEVIA ne se vend qu aux professionnels. La facture doit porter la raison sociale,
  // l adresse et l immatriculation de l acheteur : Stripe les demande sur la page de
  // paiement et les garde sur la session (tableau de bord Stripe, onglet Paiements).
  // Champ texte et non numerique : un charpentier suisse ou belge n a pas de SIRET.
  const anglais = enAnglais;
  const libelleImmat = anglais
    ? "Company registration no. (SIRET in France)"
    : "SIRET (ou n° d'immatriculation hors de France)";
  const avisPro = anglais
    ? "For professionals only. By paying you accept the DEVIA terms of sale: " + origine + "/en/cgv"
    : "Réservé aux professionnels. En payant, vous acceptez les conditions générales de vente de DEVIA : " + origine + "/cgv";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: idPrix, quantity: 1 }],
      // Le compte qui achete : le webhook y rattache la licence.
      client_reference_id: compte.id,
      customer_email: compte.email || undefined,
      metadata: { type: "licence", user_id: compte.id },
      // Fait apparaitre le champ "Code promotionnel" sur la page de paiement.
      allow_promotion_codes: true,
      name_collection: { business: { enabled: true, optional: false } },
      billing_address_collection: "required",
      custom_fields: [{
        key: "siret",
        label: { type: "custom", custom: libelleImmat },
        type: "text",
        text: { minimum_length: 9, maximum_length: 30 },
      }],
      custom_text: { submit: { message: avisPro } },
      success_url: origine + prefixe + "/merci?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: origine + prefixe + "/tarifs",
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "erreur inconnue";
    console.error("[DEVIA] checkout :", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
