import Link from "next/link";
import { dico, lien, type Langue } from "../i18n";

// Les textes viennent du dictionnaire ; la mise en forme (couleurs, images, icones)
// reste ici, commune aux deux langues.
export default function Fonctionnalites({ lang }: { lang: Langue }) {
  const t = dico(lang).fonctionnalites;
  const L = (c: string) => lien(lang, c);

  const features = [
    {
      cle: "f1", c: "#f59e0b", tint: "#fffbeb", txt: "#b45309", image: "/captures/formulaire-devis.jpg",
      icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2z" /></svg>,
    },
    {
      cle: "f2", c: "#3b82f6", tint: "#eff6ff", txt: "#1d4ed8", image: "/captures/vue-3d-noues.png",
      icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.7l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.7l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><path d="M3.3 7L12 12l8.7-5M12 22V12" /></svg>,
    },
    {
      cle: "f3", c: "#8b5cf6", tint: "#f5f3ff", txt: "#6d28d9", image: "/captures/eurocode-calculs.jpeg",
      icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M7 21h10M6 7l6-1 6 1" /><path d="M6 7l-3 6a3.5 3.5 0 006 0z" /><path d="M18 7l-3 6a3.5 3.5 0 006 0z" /></svg>,
    },
    {
      cle: "f4", c: "#10b981", tint: "#ecfdf5", txt: "#047857", image: "",
      icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" /><path d="M2 21c0-3 1.85-5.36 5.08-6" /></svg>,
    },
    {
      cle: "f5", c: "#f43f5e", tint: "#fff1f2", txt: "#be123c", image: "/captures/export-pdf.jpeg",
      icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M9 15h6M9 11h2" /></svg>,
    },
    {
      cle: "f6", c: "#14b8a6", tint: "#f0fdfa", txt: "#0f766e", image: "/captures/catalogue.jpeg",
      icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>,
    },
    {
      cle: "f7", c: "#6366f1", tint: "#eef2ff", txt: "#4338ca", image: "/captures/multi-projets.jpeg",
      icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>,
    },
  ];

  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.05]">
              {t.h1a}
              <br />
              <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-blue-500 bg-clip-text text-transparent">{t.h1b}</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">{t.intro}</p>
          </div>
        </div>
      </section>

      {features.map((f, i) => {
        const reversed = i % 2 === 1;
        const titre = t[f.cle + "T"];
        const bullets = [t[f.cle + "B1"], t[f.cle + "B2"], t[f.cle + "B3"]];
        return (
          <section key={f.cle} className="py-16 border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-14 items-center">
                <div className={reversed ? "md:order-2" : ""}>
                  <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide mb-4" style={{ color: f.txt }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: f.c }} />
                    {t[f.cle + "E"]}
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">{titre}</h2>
                  <p className="text-slate-600 leading-relaxed mb-6">{t[f.cle + "D"]}</p>
                  <ul className="space-y-3">
                    {bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-slate-700">
                        <span className="flex-shrink-0 mt-0.5" style={{ color: f.c }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={reversed ? "md:order-1" : ""}>
                  {f.image !== "" ? (
                    <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
                      <img src={f.image} alt={titre} className="w-full h-auto" />
                    </div>
                  ) : (
                    <div className="rounded-3xl border border-slate-200 aspect-[4/3] flex flex-col items-center justify-center gap-4" style={{ background: f.tint }}>
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white" style={{ background: f.c }}>{f.icon}</div>
                      <div className="text-xs font-semibold tracking-wide" style={{ color: f.txt }}>{t.captureAVenir}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="py-24 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-6">{t.finalTitre}</h2>
          <p className="text-xl text-slate-600 mb-10">{t.finalTexte}</p>
          <Link href={L("/tarifs")} className="inline-flex items-center bg-slate-900 text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-slate-800 transition-colors">
            {t.finalCta}
          </Link>
        </div>
      </section>
    </>
  );
}
