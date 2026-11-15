import { NextResponse } from "next/server";
import Stripe from "stripe";

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

  // DEVIA ne se vend qu aux professionnels. La facture doit porter la raison sociale,
  // l adresse et l immatriculation de l acheteur : Stripe les demande sur la page de
  // paiement et les garde sur la session (tableau de bord Stripe, onglet Paiements).
  // Champ texte et non numerique : un charpentier suisse ou belge n a pas de SIRET.
  const anglais = prefixe === "/en";
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
