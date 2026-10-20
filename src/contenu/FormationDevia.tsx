import Link from "next/link";
import { dico, lien, type Langue } from "../i18n";

// Les 6 guides. L ordre fixe la correspondance avec les cles g0..g5 des dictionnaires.
export const GUIDES = ["devis-standard", "importer-un-plan", "multi-ouvrages", "catalogue-de-prix", "tableau-calcul", "export-pdf-ifc"];

export default function FormationDevia({ lang }: { lang: Langue }) {
  const t = dico(lang).apprentissage;
  const L = (c: string) => lien(lang, c);

  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-widest text-amber-600 uppercase mb-4">{t.eyebrow}</p>
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">{t.fdTitre}</h1>
            <p className="text-xl text-slate-600 leading-relaxed">{t.fdIntro}</p>
            <div className="mt-8 space-y-3">
              {[t.fdP1, t.fdP2, t.fdP3].map((p) => (
                <div key={p} className="flex items-start gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 mt-0.5 shrink-0">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <p className="text-slate-700">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-3">{t.fdGuidesT}</h2>
            <p className="text-lg text-slate-600">{t.fdGuidesD}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GUIDES.map((slug, i) => (
              <Link key={slug} href={L("/apprentissage/formation-devia/" + slug)} className="block bg-slate-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
                <div className="text-amber-600 font-bold text-sm mb-3">{"0" + (i + 1)}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t["g" + i + "T"]}</h3>
                <p className="text-slate-600 leading-relaxed">{t["g" + i + "D"]}</p>
                <p className="text-amber-600 font-semibold text-sm mt-4">{t.fdLire}</p>
              </Link>
            ))}
          </div>
          <p className="text-center text-slate-500 mt-12">{t.fdNote}</p>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">{t.fdAccT}</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">{t.fdAccD}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={L("/apprentissage/programmes")} className="inline-flex items-center justify-center bg-amber-500 text-slate-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-amber-400 transition-colors">{t.fdCta1}</Link>
            <Link href={L("/contact")} className="inline-flex items-center justify-center border border-slate-300 text-slate-700 px-8 py-4 rounded-lg text-base font-semibold hover:bg-slate-50 transition-colors">{t.fdCta2}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
