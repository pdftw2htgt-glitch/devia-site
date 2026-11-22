"use client";

import { useEffect, useState } from "react";
import { dico, type Langue } from "../i18n";
import { mesureRefusee, choisirMesure, signalNePasSuivre } from "./SiteTracker";

// Refuser ou reactiver la mesure d audience. "discret" : le lien du pied de page ;
// sinon le bloc de la politique de confidentialite, avec l etat actuel.
export default function ChoixMesure({ lang, discret = false }: { lang: Langue; discret?: boolean }) {
  const t = dico(lang).mesure;
  // null tant que le navigateur n a pas ete lu : rien ne s affiche au rendu serveur.
  const [refus, setRefus] = useState<boolean | null>(null);
  const [signal, setSignal] = useState(false);

  useEffect(() => {
    setRefus(mesureRefusee());
    setSignal(signalNePasSuivre());
  }, []);

  if (refus === null) return null;

  const basculer = () => {
    choisirMesure(refus);
    setRefus(mesureRefusee());
  };

  if (discret) {
    if (signal) return null;
    return (
      <button type="button" onClick={basculer} className="text-left text-slate-400 hover:text-white underline">
        {refus ? t.reactiver : t.refuser}
      </button>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm">
      <p className="mb-3">{signal ? t.etatSignal : (refus ? t.etatRefus : t.etatActif)}</p>
      {signal ? null : (
        <button type="button" onClick={basculer} className="bg-slate-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-800 transition-colors">
          {refus ? t.reactiver : t.refuser}
        </button>
      )}
    </div>
  );
}
