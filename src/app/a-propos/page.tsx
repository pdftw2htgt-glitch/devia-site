export default function AboutPage() {
  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-8">
          Notre mission.
        </h1>
        <div className="prose prose-lg text-slate-700 space-y-6">
          <p className="text-xl leading-relaxed">
            DEVIA est ne d&apos;un constat simple : les logiciels existants pour
            la charpente sont trop chers, trop complexes, et concus pour les
            bureaux d&apos;etudes. Pas pour les artisans qui font le travail au quotidien.
          </p>
          <p>
            Notre mission est de democratiser l&apos;outillage numerique pour
            les professionnels de la charpente. Que vous soyez un artisan solo
            ou une petite entreprise de 5 personnes, vous meritez un outil
            puissant, intuitif, et a un prix juste.
          </p>
          <p>
            DEVIA combine le meilleur de l&apos;intelligence artificielle moderne
            avec l&apos;expertise des normes du batiment francais (Eurocode).
            Le resultat : des devis professionnels, generes en quelques secondes,
            avec une visualisation 3D claire pour vos clients.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Nos valeurs</h2>
          <ul className="space-y-3">
            <li><strong>Simplicite.</strong> Un logiciel doit etre evident a utiliser.</li>
            <li><strong>Honnetete.</strong> Pas de prix cache, pas d&apos;upsell agressif.</li>
            <li><strong>Qualite.</strong> Vos devis representent votre travail. Ils doivent etre impeccables.</li>
            <li><strong>Independance.</strong> Vous payez une fois, vous gardez l&apos;acces. Pas de location forcee.</li>
          </ul>
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Le projet</h2>
          <p>
            DEVIA est un projet francais, developpe par une petite equipe
            passionnee par le bois et le code. Nous travaillons en proximite
            avec des charpentiers professionnels pour faire evoluer le logiciel
            en fonction des besoins reels du terrain.
          </p>
        </div>
      </div>
    </section>
  );
}
