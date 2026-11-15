"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { dico, lien, type Langue } from "../i18n";

// Demande une session de paiement au serveur, au nom du compte connecte. Le serveur verifie
// le jeton et rattache la future licence a ce compte : l acheteur n a plus de cle a recopier.
// Renvoie l adresse de la page Stripe, ou un message d erreur.
export async function lancerPaiement(lang: Langue, jeton: string): Promise<{ url?: string; error?: string }> {
  try {
    const r = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + jeton },
      body: JSON.stringify({ lang: lang }),
    });
    return await r.json();
  } catch (e) {
    return { error: e instanceof Error ? e.message : dico(lang).achat.acErreur };
  }
}

// Bouton d achat : il faut un compte DEVIA pour acheter. Sans session, il envoie vers
// Mon compte, qui relance le paiement tout seul une fois la personne connectee.
export default function AchatConnecte({
  lang = "fr",
  libelle,
  className = "",
}: { lang?: Langue; libelle?: string; className?: string }) {
  const t = dico(lang).achat;
  const [charge, setCharge] = useState(false);
  const [erreur, setErreur] = useState("");

  const acheter = async () => {
    setCharge(true);
    setErreur("");
    const { data } = await supabase.auth.getSession();
    const jeton = data.session ? data.session.access_token : "";
    if (jeton === "") {
      window.location.href = lien(lang, "/compte") + "?suite=acheter";
      return;
    }
    const res = await lancerPaiement(lang, jeton);
    if (res.url) { window.location.href = res.url; return; }
    setErreur(res.error || t.acErreur);
    setCharge(false);
  };

  const habillage = className === ""
    ? "w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
    : className;

  return (
    <>
      <button type="button" onClick={acheter} disabled={charge} className={habillage}>
        {charge ? t.acRedirection : (libelle === undefined ? t.acBouton : libelle)}
      </button>
      {erreur === "" ? null : <p className="mt-2 text-sm text-red-600">{erreur}</p>}
    </>
  );
}
