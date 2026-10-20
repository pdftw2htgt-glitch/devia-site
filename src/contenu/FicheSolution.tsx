import Link from "next/link";
import { notFound } from "next/navigation";
import { dico, lien, type Langue } from "../i18n";

// Liste de reference des 11 fiches. L ordre fixe la correspondance avec les cles
// f0..f10 des dictionnaires : ne jamais reordonner, seulement ajouter a la fin.
// Les libelles courts (eyebrow) viennent de la section nav, deja traduite pour le menu.
export const FICHES = [
  { id: "charpente-traditionnelle", eyebrow: "solTradL", c: "#f59e0b", txt: "#b45309", tint: "#fffbeb" },
  { id: "charpente-industrielle", eyebrow: "solIndusL", c: "#3b82f6", txt: "#1d4ed8", tint: "#eff6ff" },
  { id: "construction-bois", eyebrow: "solBoisL", c: "#8b5cf6", txt: "#6d28d9", tint: "#f5f3ff" },
  { id: "charpente-couverture", eyebrow: "solCouvL", c: "#10b981", txt: "#047857", tint: "#ecfdf5" },
  { id: "extension", eyebrow: "solExtL", c: "#f43f5e", txt: "#be123c", tint: "#fff1f2" },
  { id: "multi-structure", eyebrow: "solMultiL", c: "#14b8a6", txt: "#0f766e", tint: "#f0fdfa" },
  { id: "neuf-renovation", eyebrow: "solNeufL", c: "#6366f1", txt: "#4338ca", tint: "#eef2ff" },
  { id: "etude-calcul", eyebrow: "solEtudeL", c: "#f97316", txt: "#c2410c", tint: "#fff7ed" },
  { id: "logistique", eyebrow: "solLogiL", c: "#06b6d4", txt: "#0e7490", tint: "#ecfeff" },
  { id: "export-ifc", eyebrow: "solIfcL", c: "#84cc16", txt: "#4d7c0f", tint: "#f7fee7" },
  { id: "conception-chiffrage", eyebrow: "solChiffL", c: "#a855f7", txt: "#7e22ce", tint: "#faf5ff" },
];

// Titre et description de l onglet du navigateur, dans la langue de la page.
export function metaFiche(lang: Langue, slug: string) {
  const i = FICHES.findIndex((x) => x.id === slug);
  if (i < 0) return { title: "Solutions - DEVIA" };
  const d = dico(lang);
  return { title: d.nav[FICHES[i].eyebrow] + " - DEVIA", description: d.fiches["f" + i + "I"] };
}

export default function FicheSolution({ lang, slug }: { lang: Langue; slug: string }) {
  const i = FICHES.findIndex((x) => x.id === slug);
  if (i < 0) notFound();
  const s = FICHES[i];
  const d = dico(lang);
  const t = d.fiches;
  const p = "f" + i;
  const L = (c: string) => lien(lang, c);
  const points = [t[p + "P1"], t[p + "P2"], t[p + "P3"]];
  const etapes = [0, 1, 2].map((k) => ({ t: t[p + "E" + k + "T"], d: t[p + "E" + k + "D"] }));

  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide mb-4" style={{ color: s.txt }}>
            <span className="w-2 h-2 rounded-full" style={{ background: s.c }} />
            {d.nav[s.eyebrow]}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">{t[p + "T"]}</h1>
          <p className="text-xl text-slate-600 leading-relaxed">{t[p + "I"]}</p>
        </div>
      </section>

      <section className="py-14 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-5">{t.ceQueFait}</h2>
            <ul className="space-y-3">
              {points.map((b) => (
                <li key={b} className="flex gap-3 text-slate-700">
                  <span className="flex-shrink-0 mt-0.5" style={{ color: s.c }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">{t.enDetail}</h2>
            <p className="text-slate-600 leading-relaxed">{t[p + "D1"]}</p>
            <p className="text-slate-600 leading-relaxed">{t[p + "D2"]}</p>
          </div>
        </div>
      </section>

      <section className="py-14 border-t border-slate-100" style={{ background: s.tint }}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">{t.commentCaMarche}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {etapes.map((e, k) => (
              <div key={e.t} className="bg-white rounded-2xl p-6 border border-slate-200">
                <div className="text-sm font-bold mb-2" style={{ color: s.txt }}>{"0" + (k + 1)}</div>
                <div className="font-bold text-slate-900 mb-2">{e.t}</div>
                <div className="text-sm text-slate-600 leading-relaxed">{e.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">{t.finalTitre}</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={L("/tarifs")} className="inline-flex items-center justify-center bg-slate-900 text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-slate-800 transition-colors">{t.finalCta1}</Link>
            <Link href={L("/solutions")} className="inline-flex items-center justify-center border border-slate-300 text-slate-700 px-8 py-4 rounded-lg text-base font-semibold hover:bg-slate-50 transition-colors">{t.finalCta2}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
