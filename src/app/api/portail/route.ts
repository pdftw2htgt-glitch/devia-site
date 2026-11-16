import { NextResponse } from "next/server";
import { supabaseService, stripeServeur, compteDeLaRequete, licenceDuCompte } from "@/lib/compteServeur";

export const runtime = "nodejs";

// Espace client Stripe : le client y change sa carte, telecharge ses factures et resilie
// sa maintenance lui-meme. Le portail doit avoir ete enregistre une fois dans le tableau
// de bord Stripe (Parametres > Facturation > Portail client), en test et en reel.
export async function POST(req: Request) {
  let prefixe = "";
  try {
    const corps = await req.json();
    if (corps && corps.lang === "en") prefixe = "/en";
  } catch {
    prefixe = "";
  }
  const en = prefixe === "/en";

  const sb = supabaseService();
  const stripe = stripeServeur();
  if (sb === null || stripe === null) {
    return NextResponse.json({ error: "Stripe ou Supabase n est pas configure (.env.local)" }, { status: 500 });
  }
  const compte = await compteDeLaRequete(req, sb);
  if (compte === null) {
    return NextResponse.json({ error: en ? "Sign in to your DEVIA account first." : "Connectez-vous d'abord à votre compte DEVIA." }, { status: 401 });
  }
  const licence = await licenceDuCompte(sb, compte.id);
  if (licence === null || licence.stripe_customer_id === null || licence.stripe_customer_id === "") {
    return NextResponse.json({ error: en ? "No maintenance subscription on this account." : "Aucun abonnement de maintenance sur ce compte." }, { status: 404 });
  }
  try {
    const portail = await stripe.billingPortal.sessions.create({
      customer: licence.stripe_customer_id,
      return_url: new URL(req.url).origin + prefixe + "/compte",
    });
    return NextResponse.json({ url: portail.url });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "erreur inconnue";
    console.error("[DEVIA] portail client :", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
