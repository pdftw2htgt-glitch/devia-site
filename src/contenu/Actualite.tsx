import Link from "next/link";
import { dico, lien, type Langue } from "../i18n";

// Nombre d annonces publiees. Pour en ajouter une : ecrire n10D / n10T / n10X
// dans fr.json et en.json (les plus recentes en tete), puis passer NB a 11.
const NB = 10;

export default function Actualite({ lang }: { lang: Langue }) {
  const d = dico(lang);
  const t = d.actualite;
  const L = (c: string) => lien(lang, c);

  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">
              {t.h1a}
              <br />
              <span className="text-amber-600">{t.h1b}</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">{t.intro}</p>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-8">
            {Array.from({ length: NB }, (x, i) => i).map((i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
                <div className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold mb-4">{t["n" + i + "D"]}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t["n" + i + "T"]}</h3>
                <p className="text-slate-600 leading-relaxed">{t["n" + i + "X"]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-6">{t.finalTitre}</h2>
          <p className="text-xl text-slate-300 mb-10">{t.finalTexte}</p>
          <Link href={L("/tarifs")} className="inline-flex items-center bg-amber-500 text-slate-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-amber-400 transition-colors">
            {t.finalCta}
          </Link>
        </div>
      </section>
    </>
  );
}
