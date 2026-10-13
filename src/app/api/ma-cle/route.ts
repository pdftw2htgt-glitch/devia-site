import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

// Rend la cle creee pour une session de paiement donnee.
// On verifie d abord aupres de Stripe que la session existe ET qu elle est reglee :
// connaitre un identifiant de session ne suffit donc pas a se faire offrir une licence.
export async function GET(req: Request) {
  const idSession = new URL(req.url).searchParams.get("session_id") || "";
  if (idSession === "") {
    return NextResponse.json({ error: "session_id manquant" }, { status: 400 });
  }

  const cleStripe = process.env.STRIPE_SECRET_KEY || "";
  const urlSupa = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const cleService = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (cleStripe === "" || urlSupa === "" || cleService === "") {
    return NextResponse.json({ error: "configuration incomplete" }, { status: 500 });
  }

  try {
    const stripe = new Stripe(cleStripe);
    const session = await stripe.checkout.sessions.retrieve(idSession);
    const regle = session.payment_status === "paid" || session.payment_status === "no_payment_required";
    if (regle === false) {
      return NextResponse.json({ error: "paiement non abouti" }, { status: 402 });
    }

    const sb = createClient(urlSupa, cleService, { auth: { persistSession: false } });
    const r = await sb
      .from("licenses")
      .select("license_key")
      .eq("stripe_purchase_id", idSession)
      .maybeSingle();

    if (r.data) {
      return NextResponse.json({ license_key: r.data.license_key });
    }
    // Le webhook peut arriver une seconde apres la redirection : la page reessaiera.
    return NextResponse.json({ enAttente: true }, { status: 202 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "erreur inconnue";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
