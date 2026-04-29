import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-800 text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
              Nouveau - Propulse par l&apos;intelligence artificielle
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.05] mb-6">
              Vos devis charpente
              <br />
              <span className="text-amber-600">en 30 secondes.</span>
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl">
              DEVIA est le logiciel professionnel qui revolutionne la creation
              de devis charpente. Decrivez votre projet en langage naturel,
              obtenez un devis complet et une visualisation 3D instantanement.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/tarifs"
                className="inline-flex items-center justify-center bg-slate-900 text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-slate-800 transition-colors"
              >
                Acheter DEVIA - 2 000 &euro;
              </Link>
              <Link
                href="/fonctionnalites"
                className="inline-flex items-center justify-center border border-slate-300 text-slate-700 px-8 py-4 rounded-lg text-base font-semibold hover:bg-slate-50 transition-colors"
              >
                Decouvrir les fonctionnalites
              </Link>
            </div>

            <p className="text-sm text-slate-500 mt-6">
              Achat unique. Acces a vie. Mise a jour optionnelle a 35 &euro;/mois.
            </p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Concu pour les professionnels exigeants
            </h2>
            <p className="text-lg text-slate-600">
              Trois principes simples : rapidite, precision, simplicite.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-700">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Rapide</h3>
              <p className="text-slate-600 leading-relaxed">
                Devis complet en 30 secondes au lieu de 30 minutes.
                Reaffectez votre temps a ce qui compte vraiment.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-700">
                  <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Precis</h3>
              <p className="text-slate-600 leading-relaxed">
                Calculs structurels selon les normes Eurocode 5.
                Vos devis sont fiables, professionnels, defendables.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-700">
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Simple</h3>
              <p className="text-slate-600 leading-relaxed">
                Interface pensee pour les artisans, pas pour les ingenieurs.
                Decrivez en francais courant, DEVIA s&apos;occupe du reste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARAISON */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Pourquoi pas Cadwork ou SEMA ?
            </h2>
            <p className="text-lg text-slate-300">
              Ces logiciels sont puissants, mais hors de portee pour 80% des artisans.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-slate-800 rounded-2xl p-8">
              <div className="text-slate-400 text-sm font-semibold mb-2">Logiciels traditionnels</div>
              <div className="text-3xl font-bold mb-4">8 000 &euro; - 20 000 &euro;</div>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>&times; Formation longue (semaines)</li>
                <li>&times; Materiel puissant requis</li>
                <li>&times; Maintenance complexe</li>
                <li>&times; Cible les bureaux d&apos;etudes</li>
              </ul>
            </div>

            <div className="bg-amber-50 text-slate-900 rounded-2xl p-8 ring-2 ring-amber-400">
              <div className="text-amber-700 text-sm font-semibold mb-2">DEVIA</div>
              <div className="text-3xl font-bold mb-4">2 000 &euro;</div>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>&check; Prise en main immediate</li>
                <li>&check; Fonctionne sur n&apos;importe quel ordinateur</li>
                <li>&check; Mise a jour automatique</li>
                <li>&check; Concu pour les artisans</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/tarifs"
              className="inline-flex items-center bg-amber-500 text-slate-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-amber-400 transition-colors"
            >
              Voir les tarifs detailles
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
            Rejoignez les charpentiers qui gagnent du temps avec DEVIA.
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
