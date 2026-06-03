import Link from "next/link";
import CharpenteBackground from "@/components/CharpenteBackground";

export default function HomePage() {
  return (
    <>
      {/* HERO - fond sombre avec animation 3D */}
      <section className="relative overflow-hidden bg-slate-950 min-h-[80vh]">
        {/* Animation 3D en fond */}
        <CharpenteBackground />

        {/* Overlay gradient pour lisibilite du texte */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-medium mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></span>
              Propulse par l&apos;intelligence artificielle
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.05] mb-6">
              Vos devis charpente,
              <br />
              <span className="text-amber-400">automatises par l&apos;IA.</span>
            </h1>

            <p className="text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl">
              Decrivez votre projet en langage naturel. DEVIA genere un devis complet
              et une visualisation 3D, prets a presenter a vos clients.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/tarifs"
                className="inline-flex items-center justify-center bg-amber-500 text-slate-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
              >
                Acheter DEVIA
              </Link>
              <Link
                href="/fonctionnalites"
                className="inline-flex items-center justify-center border border-slate-600 text-slate-200 px-8 py-4 rounded-lg text-base font-semibold hover:bg-slate-800 hover:border-slate-500 transition-colors backdrop-blur-sm"
              >
                Decouvrir les fonctionnalites
              </Link>
            </div>

            <p className="text-sm text-slate-400 mt-6">
              Achat unique. Acces a vie. Mise a jour optionnelle.
            </p>
          </div>
        </div>
      </section>

      {/* 3 BENEFICES */}
      <section className="py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Concu pour les professionnels exigeants
            </h2>
            <p className="text-lg text-slate-600">
              Trois piliers fondamentaux : fiabilite, confidentialite, efficacite.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Fiabilite */}
            <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-700">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Fiabilite</h3>
              <p className="text-slate-600 leading-relaxed">
                Calculs structurels bases sur les normes Eurocode 5.
                Vos devis sont solides, defendables, professionnels.
              </p>
            </div>

            {/* Confidentialite */}
            <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-700">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Confidentialite</h3>
              <p className="text-slate-600 leading-relaxed">
                Vos projets restent confidentiels. Aucun de vos devis
                n&apos;est partage ou utilise pour entrainer des IA tierces.
              </p>
            </div>

            {/* Gain de temps */}
            <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-700">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Gain de temps</h3>
              <p className="text-slate-600 leading-relaxed">
                Reduisez a quelques minutes ce qui prenait 2 heures.
                Concentrez-vous sur vos vrais chantiers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* POURQUOI DEVIA ? (remplace le comparatif Cadwork) */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            Pourquoi DEVIA ?
          </h2>

          <p className="text-2xl font-light text-slate-200 mb-8 leading-relaxed">
            Combien de temps passez-vous a chiffrer des devis qui ne se transforment
            jamais en chantier ?
          </p>

          <div className="text-lg text-slate-300 leading-relaxed space-y-6 max-w-3xl mx-auto">
            <p>
              Chaque devis charpente prend en moyenne <strong className="text-amber-400">2 heures</strong> de votre temps
              &mdash; un temps non facture, souvent perdu pour des clients qui ne donneront jamais suite.
            </p>
            <p>
              DEVIA est concu pour automatiser ces petits devis a faible valeur,
              et liberer votre temps pour les vrais chantiers.
            </p>
          </div>

          <div className="mt-12">
            <Link
              href="/tarifs"
              className="inline-flex items-center bg-amber-500 text-slate-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-amber-400 transition-colors"
            >
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-6">
            Pret a moderniser vos devis ?
          </h2>
          <p className="text-xl text-slate-600 mb-10">
            Rejoignez les professionnels qui ont choisi d&apos;automatiser leurs devis.
          </p>
          <Link
            href="/tarifs"
            className="inline-flex items-center bg-slate-900 text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-slate-800 transition-colors"
          >
            Commencer maintenant
          </Link>
        </div>
      </section>
    </>
  );
}
