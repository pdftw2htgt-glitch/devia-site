"use client";

import { useState } from "react";

export default function CalculateurRentabilite() {
  const [devis, setDevis] = useState(60);
  const [temps, setTemps] = useState(4);
  const [taux, setTaux] = useState(45);

  const coutMois = (Number(devis) || 0) * (Number(temps) || 0) * (Number(taux) || 0);
  const devia = 150;
  const ratio = coutMois > 0 ? Math.round(coutMois / devia) : 0;
  const fmt = (n: number) => Math.round(n).toLocaleString("fr-FR");

  const champ =
    "w-full border border-slate-300 rounded-lg px-4 py-3 text-lg font-semibold text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20";

  return (
    <div className="max-w-3xl mx-auto px-6 mt-24">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Combien vous coute le chiffrage ?
        </h2>
        <p className="text-slate-600">Ajustez les chiffres a votre realite.</p>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="grid sm:grid-cols-3 gap-5 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Devis par mois</label>
            <input type="number" min={0} value={devis} onChange={(e) => setDevis(Number(e.target.value))} className={champ} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Heures par devis</label>
            <input type="number" min={0} step={0.5} value={temps} onChange={(e) => setTemps(Number(e.target.value))} className={champ} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Votre taux horaire (&euro;)</label>
            <input type="number" min={0} value={taux} onChange={(e) => setTaux(Number(e.target.value))} className={champ} />
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-6 text-center">
          <div className="text-sm text-slate-500 mb-1">Votre chiffrage vous coute</div>
          <div className="text-4xl font-bold text-slate-900 mb-4">
            {fmt(coutMois)} &euro; <span className="text-xl text-slate-500 font-semibold">/ mois</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 rounded-full px-4 py-2 text-sm font-semibold">
            DEVIA : 150 &euro; / mois &mdash; soit {ratio}&times; moins cher
          </div>
        </div>
        <p className="text-center text-xs text-slate-400 italic mt-5">
          Estimation indicative. DEVIA ramene chaque devis a quelques minutes.
        </p>
      </div>
    </div>
  );
}
