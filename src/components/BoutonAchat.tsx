"use client";

import { useState } from "react";
import { dico, type Langue } from "../i18n";

// Bouton d achat : demande une session de paiement au serveur, puis envoie l acheteur
// chez Stripe. Le code promo se saisit sur la page de Stripe, pas ici.
// className permet de reprendre exactement l habillage du bouton qu il remplace.
// lang sert a deux choses : le texte du bouton, et la page de retour apres paiement
// (/merci en francais, /en/merci en anglais) - c est le serveur qui la construit.
export default function BoutonAchat({
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
    try {
      const r = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang: lang }),
      });
      const j = await r.json();
      if (j.url) { window.location.href = j.url; return; }
      setErreur(j.error || t.acErreur);
    } catch (e) {
      setErreur(e instanceof Error ? e.message : t.acErreur);
    }
    setCharge(false);
  };

  const habillage = className !== ""
    ? className
    : "w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors";

  return (
    <>
      <button type="button" onClick={acheter} disabled={charge} className={habillage}>
        {charge ? t.acRedirection : (libelle === undefined ? t.acBouton : libelle)}
      </button>
      {erreur !== "" && (
        <p className="mt-2 text-sm text-red-600">{erreur}</p>
      )}
    </>
  );
}
