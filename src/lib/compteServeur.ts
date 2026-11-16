import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";
import Stripe from "stripe";

// Outils cote serveur partages par les routes de paiement. Rien ici ne doit etre importe
// par une page : la cle de service Supabase et la cle secrete Stripe ne quittent jamais
// le serveur.

export function supabaseService(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const cle = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (url === "" || cle === "") return null;
  return createClient(url, cle, { auth: { persistSession: false } });
}

export function stripeServeur(): Stripe | null {
  const cle = process.env.STRIPE_SECRET_KEY || "";
  return cle === "" ? null : new Stripe(cle);
}

// Le compte DEVIA qui fait la demande : le navigateur envoie son jeton de session, que
// Supabase verifie. Sans jeton valide, null.
export async function compteDeLaRequete(req: Request, sb: SupabaseClient): Promise<User | null> {
  const entete = req.headers.get("authorization") || "";
  const jeton = entete.startsWith("Bearer ") ? entete.slice(7) : "";
  if (jeton === "") return null;
  const lu = await sb.auth.getUser(jeton);
  if (lu.error || lu.data === null) return null;
  return lu.data.user;
}

export type LicenceServeur = {
  id: string;
  subscription_status: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
};

export async function licenceDuCompte(sb: SupabaseClient, idCompte: string): Promise<LicenceServeur | null> {
  const r = await sb
    .from("licenses")
    .select("id, subscription_status, stripe_customer_id, stripe_subscription_id")
    .eq("user_id", idCompte)
    .limit(1);
  if (r.error || r.data === null || r.data.length === 0) return null;
  return r.data[0] as LicenceServeur;
}

// Le prix mensuel d une formule de maintenance, retrouve par les metadonnees du produit
// (type = maintenance, formule = standard ou personnalisee) : aucun identifiant de prix a
// recopier, et la meme regle marche en mode test comme en mode reel.
export async function prixMaintenance(stripe: Stripe, formule: string): Promise<string | null> {
  const produits = await stripe.products.search({
    query: "active:'true' AND metadata['type']:'maintenance' AND metadata['formule']:'" + formule + "'",
    limit: 1,
  });
  if (produits.data.length === 0) return null;
  const prix = await stripe.prices.list({ product: produits.data[0].id, active: true, type: "recurring", limit: 1 });
  return prix.data.length === 0 ? null : prix.data[0].id;
}
