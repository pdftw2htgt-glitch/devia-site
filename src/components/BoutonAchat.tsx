"use client";

import { useState } from "react";

// Bouton d achat : demande une session de paiement au serveur, puis envoie l acheteur
// chez Stripe. Le code promo se saisit sur la page de Stripe, pas ici.
// className permet de reprendre exactement l habillage du bouton qu il remplace.
export default function BoutonAchat({
  libelle = "Acheter DEVIA",
  className = "",
}: { libelle?: string; className?: string }) {
  const [charge, setCharge] = useState(false);
  const [erreur, setErreur] = useState("");

  const acheter = async () => {
    setCharge(true);
    setErreur("");
    try {
      const r = await fetch("/api/checkout", { method: "POST" });
      const j = await r.json();
      if (j.url) { window.location.href = j.url; return; }
      setErreur(j.error || "Le paiement n a pas pu demarrer.");
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Le paiement n a pas pu demarrer.");
    }
    setCharge(false);
  };

  const habillage = className !== ""
    ? className
    : "w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors";

  return (
    <>
      <button type="button" onClick={acheter} disabled={charge} className={habillage}>
        {charge ? "Redirection..." : libelle}
      </button>
      {erreur !== "" && (
        <p className="mt-2 text-sm text-red-600">{erreur}</p>
      )}
    </>
  );
}
