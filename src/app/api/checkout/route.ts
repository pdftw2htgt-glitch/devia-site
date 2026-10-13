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

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: idPrix, quantity: 1 }],
      // Fait apparaitre le champ "Code promotionnel" sur la page de paiement.
      allow_promotion_codes: true,
      success_url: origine + "/merci?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: origine + "/tarifs",
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "erreur inconnue";
    console.error("[DEVIA] checkout :", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
