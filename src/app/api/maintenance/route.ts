import { NextResponse } from "next/server";
import { supabaseService, stripeServeur, compteDeLaRequete, licenceDuCompte, prixMaintenance } from "@/lib/compteServeur";

export const runtime = "nodejs";

// Souscription a la maintenance standard, depuis Mon compte. Il faut un compte connecte
// QUI A DEJA une licence : la maintenance s accroche a cette licence. Le webhook Stripe
// tient ensuite son etat a jour (active, paiement en retard, resiliee).
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
  if (licence === null) {
    return NextResponse.json({ error: en ? "This account has no DEVIA licence yet." : "Ce compte n'a pas encore de licence DEVIA." }, { status: 409 });
  }
  if (licence.subscription_status === "active" || licence.subscription_status === "past_due") {
    return NextResponse.json({ error: en ? "Maintenance is already active on this licence." : "La maintenance est déjà active sur cette licence." }, { status: 409 });
  }
  const idPrix = await prixMaintenance(stripe, "standard");
  if (idPrix === null) {
    console.error("[DEVIA] maintenance : aucun produit Stripe avec type=maintenance et formule=standard");
    return NextResponse.json({ error: en ? "Maintenance is not available yet." : "La maintenance n'est pas encore disponible." }, { status: 500 });
  }

  const origine = new URL(req.url).origin;
  const libelleImmat = en ? "Company registration no. (SIRET in France)" : "SIRET (ou n° d'immatriculation hors de France)";
  const avisPro = en
    ? "Monthly maintenance, no commitment, cancel at any time. Terms of sale: " + origine + "/en/cgv"
    : "Maintenance mensuelle, sans engagement, résiliable à tout moment. Conditions générales de vente : " + origine + "/cgv";
  const metaDonnees = { type: "maintenance", formule: "standard", user_id: compte.id, licence_id: licence.id };

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: idPrix, quantity: 1 }],
      client_reference_id: compte.id,
      ...(licence.stripe_customer_id ? { customer: licence.stripe_customer_id } : { customer_email: compte.email || undefined }),
      metadata: metaDonnees,
      // Recopiees sur l abonnement lui-meme : le webhook retrouve la licence meme si
      // l evenement de l abonnement arrive avant celui de la session.
      subscription_data: { metadata: metaDonnees },
      name_collection: { business: { enabled: true, optional: false } },
      billing_address_collection: "required",
      custom_fields: [{
        key: "siret",
        label: { type: "custom", custom: libelleImmat },
        type: "text",
        text: { minimum_length: 9, maximum_length: 30 },
      }],
      custom_text: { submit: { message: avisPro } },
      success_url: origine + prefixe + "/compte?maintenance=ok",
      cancel_url: origine + prefixe + "/compte",
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "erreur inconnue";
    console.error("[DEVIA] maintenance :", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
