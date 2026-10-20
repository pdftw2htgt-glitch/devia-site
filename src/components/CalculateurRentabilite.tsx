"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { dico, type Langue } from "../i18n";

export default function CalculateurRentabilite() {
  // La langue se lit dans l URL, comme pour le menu : aucun reglage a passer depuis la page.
  const chemin = usePathname() || "/";
  const lang: Langue = (chemin === "/en" || chemin.startsWith("/en/")) ? "en" : "fr";
  const t = dico(lang).calculateur;
  const [devis, setDevis] = useState(60);
  const [temps, setTemps] = useState(4);
  const [taux, setTaux] = useState(45);

  const coutMois = (Number(devis) || 0) * (Number(temps) || 0) * (Number(taux) || 0);
  const devia = 150;
  const ratio = coutMois > 0 ? Math.round(coutMois / devia) : 0;
  const fmt = (n: number) => Math.round(n).toLocaleString(lang === "en" ? "en-GB" : "fr-FR");

  const champ =
    "w-full border border-slate-300 rounded-lg px-4 py-3 text-lg font-semibold text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20";

  return (
    <div className="max-w-3xl mx-auto px-6 mt-24">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">{t.titre}</h2>
        <p className="text-slate-600">{t.intro}</p>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="grid sm:grid-cols-3 gap-5 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">{t.devisMois}</label>
            <input type="number" min={0} value={devis} onChange={(e) => setDevis(Number(e.target.value))} className={champ} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">{t.heuresDevis}</label>
            <input type="number" min={0} step={0.5} value={temps} onChange={(e) => setTemps(Number(e.target.value))} className={champ} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">{t.tauxHoraire}</label>
            <input type="number" min={0} value={taux} onChange={(e) => setTaux(Number(e.target.value))} className={champ} />
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-6 text-center">
          <div className="text-sm text-slate-500 mb-1">{t.resultatLabel}</div>
          <div className="text-4xl font-bold text-slate-900 mb-4">
            {fmt(coutMois)} &euro; <span className="text-xl text-slate-500 font-semibold">{t.parMois}</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 rounded-full px-4 py-2 text-sm font-semibold">
            {t.comparaisonAvant}{ratio}{t.comparaisonApres}
          </div>
        </div>
        <p className="text-center text-xs text-slate-400 italic mt-5">
          {t.note}
        </p>
      </div>
    </div>
  );
}
