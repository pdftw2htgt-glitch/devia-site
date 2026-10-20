import Link from "next/link";
import { dico, lien, type Langue } from "../i18n";

export default function Aide({ lang }: { lang: Langue }) {
  const t = dico(lang).apprentissage;
  const L = (c: string) => lien(lang, c);

  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-widest text-amber-600 uppercase mb-4">{t.eyebrow}</p>
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">{t.adTitre}</h1>
            <p className="text-xl text-slate-600 leading-relaxed">{t.adIntro}</p>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t["i" + i + "T"]}</h3>
                <p className="text-slate-600 leading-relaxed">{t["i" + i + "D"]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-8 text-center">{t.adFaqT}</h2>
          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <details key={i} className="group bg-white border border-slate-200 rounded-2xl">
                <summary className="flex items-center justify-between cursor-pointer list-none px-6 py-5">
                  <span className="text-base font-semibold text-slate-900">{t["q" + i]}</span>
                  <span className="text-2xl font-light text-amber-600 transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <p className="px-6 pb-6 text-slate-600 leading-relaxed">{t["a" + i]}</p>
              </details>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link href={L("/contact")} className="inline-flex items-center justify-center bg-amber-500 text-slate-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-amber-400 transition-colors">{t.adCta1}</Link>
            <Link href={L("/apprentissage/formation-devia")} className="inline-flex items-center justify-center border border-slate-300 text-slate-700 px-8 py-4 rounded-lg text-base font-semibold hover:bg-slate-50 transition-colors">{t.adCta2}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
