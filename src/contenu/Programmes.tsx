import Link from "next/link";
import { dico, lien, type Langue } from "../i18n";

const NB = 4;

export default function Programmes({ lang }: { lang: Langue }) {
  const t = dico(lang).apprentissage;
  const L = (c: string) => lien(lang, c);

  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-widest text-amber-600 uppercase mb-4">{t.eyebrow}</p>
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">{t.pgTitre}</h1>
            <p className="text-xl text-slate-600 leading-relaxed">{t.pgIntro}</p>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          {Array.from({ length: NB }, (x, i) => i).map((i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-8 md:p-10 grid md:grid-cols-2 gap-8">
              <div>
                <div className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold mb-4">{t["p" + i + "Tag"]}</div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">{t["p" + i + "T"]}</h2>
                <p className="text-slate-600 leading-relaxed">{t["p" + i + "D"]}</p>
              </div>
              <div className="md:border-l md:border-slate-200 md:pl-8 flex flex-col justify-center gap-4">
                {[t.pgPublic, t.pgFormat, t.pgResultat].map((k, j) => (
                  <div key={k}>
                    <div className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-1">{k}</div>
                    <div className="text-slate-800">{t["p" + i + "V" + (j + 1)]}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">{t.pgFinalT}</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">{t.pgFinalD}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={L("/contact")} className="inline-flex items-center justify-center bg-amber-500 text-slate-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-amber-400 transition-colors">{t.pgCta1}</Link>
            <Link href={L("/tarifs")} className="inline-flex items-center justify-center border border-slate-300 text-slate-700 px-8 py-4 rounded-lg text-base font-semibold hover:bg-slate-50 transition-colors">{t.pgCta2}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
