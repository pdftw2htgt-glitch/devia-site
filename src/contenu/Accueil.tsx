import Link from "next/link";
import Image from "next/image";
import { dico, lien, type Langue } from "../i18n";

// Page d accueil, commune aux deux langues : seul le dictionnaire change.
// C est ce qui evite d avoir deux versions du code a maintenir en parallele.
export default function Accueil({ lang }: { lang: Langue }) {
  const t = dico(lang).accueil;

  return (
    <>
      {/* HERO - fond sombre avec animation 3D */}
      <section className="relative overflow-hidden bg-slate-950 min-h-[80vh]">
        <Image
          src="/hero-bg.png"
          alt={t.heroAlt}
          fill
          priority
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-slate-950/45 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-medium mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></span>
              {t.badge}
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.05] mb-6">
              {t.titreA}
              <br />
              <span className="text-amber-400">{t.titreB}</span>
            </h1>

            <p className="text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl">{t.intro}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={lien(lang, "/tarifs")}
                className="inline-flex items-center justify-center bg-amber-500 text-slate-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
              >
                {t.ctaAchat}
              </Link>
              <Link
                href={lien(lang, "/fonctionnalites")}
                className="inline-flex items-center justify-center border border-slate-600 text-slate-200 px-8 py-4 rounded-lg text-base font-semibold hover:bg-slate-800 hover:border-slate-500 transition-colors backdrop-blur-sm"
              >
                {t.ctaFonctions}
              </Link>
            </div>

            <p className="text-sm text-slate-400 mt-6">{t.sousCta}</p>
          </div>
        </div>
      </section>

      {/* 3 BENEFICES */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">{t.piliersTitre}</h2>
            <p className="text-lg text-slate-600">{t.piliersIntro}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_12px_32px_rgba(245,158,11,0.12)]">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center mb-5 text-white shadow-lg shadow-amber-600/25">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.p1Titre}</h3>
              <p className="text-slate-600 leading-relaxed">{t.p1Texte}</p>
              <div className="mt-5 pt-4 border-t border-dashed border-slate-200 text-xs text-slate-500 font-mono">{t.p1Note}</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_12px_32px_rgba(245,158,11,0.12)]">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center mb-5 text-white shadow-lg shadow-amber-600/25">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.p2Titre}</h3>
              <p className="text-slate-600 leading-relaxed">{t.p2Texte}</p>
              <div className="mt-5 pt-4 border-t border-dashed border-slate-200 text-xs text-slate-500 font-mono">
                {t.p2NoteAvant}<span className="text-amber-700 font-semibold">{t.p2NoteFort}</span>{t.p2NoteApres}
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_12px_32px_rgba(245,158,11,0.12)]">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center mb-5 text-white shadow-lg shadow-amber-600/25">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.p3Titre}</h3>
              <p className="text-slate-600 leading-relaxed">{t.p3Texte}</p>
              <div className="mt-5 pt-4 border-t border-dashed border-slate-200 text-xs text-slate-500 font-mono">
                <span className="text-amber-700 font-semibold">{t.p3NoteFort}</span>{t.p3NoteApres}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POURQUOI DEVIA ? */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-6">{t.pourquoiTitre}</h2>

          <p className="text-2xl font-light text-slate-200 mb-8 leading-relaxed">{t.pourquoiAccroche}</p>

          <div className="text-lg text-slate-300 leading-relaxed space-y-6 max-w-3xl mx-auto">
            <p>
              {t.pourquoiP1Avant}<strong className="text-amber-400">{t.pourquoiP1Fort}</strong>{t.pourquoiP1Apres}
            </p>
            <p>{t.pourquoiP2}</p>
          </div>

          <div className="mt-12">
            <Link
              href={lien(lang, "/tarifs")}
              className="inline-flex items-center bg-amber-500 text-slate-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-amber-400 transition-colors"
            >
              {t.pourquoiCta}
            </Link>
          </div>
        </div>
      </section>

      {/* SPECIFICITES */}
      <section className="py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">{t.specTitre}</h2>
            <p className="text-lg text-slate-600">{t.specIntro}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.s1Titre}</h3>
              <p className="text-slate-600 leading-relaxed">{t.s1Texte}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.s2Titre}</h3>
              <p className="text-slate-600 leading-relaxed">{t.s2Texte}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.s3Titre}</h3>
              <p className="text-slate-600 leading-relaxed">{t.s3Texte}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.s4Titre}</h3>
              <p className="text-slate-600 leading-relaxed">
                {t.s4Texte}{" "}
                <Link href={lien(lang, "/tarifs")} className="text-amber-600 font-semibold hover:text-amber-700">
                  {t.s4Lien}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-6">{t.finalTitre}</h2>
          <p className="text-xl text-slate-600 mb-10">{t.finalTexte}</p>
          <Link
            href={lien(lang, "/tarifs")}
            className="inline-flex items-center bg-slate-900 text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-slate-800 transition-colors"
          >
            {t.finalCta}
          </Link>
        </div>
      </section>
    </>
  );
}
