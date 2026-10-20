import Link from "next/link";
import { dico, lien, type Langue } from "../i18n";

const RUBRIQUES = [
  { chemin: "/apprentissage/formation-devia", p: "r0" },
  { chemin: "/apprentissage/programmes", p: "r1" },
  { chemin: "/apprentissage/aide", p: "r2" },
];

export default function Apprentissage({ lang }: { lang: Langue }) {
  const t = dico(lang).apprentissage;
  const L = (c: string) => lien(lang, c);

  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">
              {t.ixH1a}
              <br />
              <span className="text-amber-600">{t.ixH1b}</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">{t.ixIntro}</p>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {RUBRIQUES.map((r) => (
              <Link key={r.chemin} href={L(r.chemin)} className="group bg-white border border-slate-200 rounded-2xl p-8 flex flex-col hover:shadow-lg hover:border-amber-300 transition-all">
                <div className="inline-flex self-start items-center px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold mb-4">{t[r.p + "Tag"]}</div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">{t[r.p + "T"]}</h2>
                <p className="text-slate-600 leading-relaxed mb-6">{t[r.p + "D"]}</p>
                <div className="space-y-2 mb-8">
                  {[t[r.p + "P1"], t[r.p + "P2"], t[r.p + "P3"]].map((p) => (
                    <div key={p} className="flex items-start gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 mt-1 shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-sm text-slate-700">{p}</span>
                    </div>
                  ))}
                </div>
                <span className="mt-auto text-amber-600 font-semibold group-hover:underline">{t.enSavoirPlus}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
