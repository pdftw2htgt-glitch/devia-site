import Link from "next/link";
import { dico, lien, type Langue } from "../i18n";
import { FICHES } from "./FicheSolution";

// La liste de reference des fiches vit dans FicheSolution : une seule table a tenir.

export default function Solutions({ lang }: { lang: Langue }) {
  const d = dico(lang);
  const t = d.solutions;
  const n = d.nav;
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

      {FICHES.map((s, i) => (
        <section key={s.id} id={s.id} className={"py-16 border-t border-slate-100 scroll-mt-24 " + (i % 2 === 1 ? "bg-slate-50" : "bg-white")}>
          <div className="max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide mb-4" style={{ color: s.txt }}>
              <span className="w-2 h-2 rounded-full" style={{ background: s.c }} />
              {n[s.eyebrow]}
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">{t["s" + i + "T"]}</h2>
            <p className="text-slate-600 leading-relaxed mb-6">{t["s" + i + "D"]}</p>
            <ul className="space-y-3">
              {[t["s" + i + "B1"], t["s" + i + "B2"], t["s" + i + "B3"]].map((b) => (
                <li key={b} className="flex gap-3 text-slate-700">
                  <span className="flex-shrink-0 mt-0.5" style={{ color: s.c }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <Link href={L("/solutions/" + s.id)} className="inline-flex items-center gap-1 mt-6 text-sm font-semibold hover:underline" style={{ color: s.txt }}>
              {t.enSavoirPlus}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </section>
      ))}

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
