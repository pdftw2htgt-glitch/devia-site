import Link from "next/link";

const features = [
  {
    title: "Generation IA",
    description: "Decrivez votre projet en francais courant. DEVIA comprend, structure et chiffre automatiquement.",
    icon: "&#x2728;",
  },
  {
    title: "Visualisation 3D",
    description: "Visualisez votre charpente en 3D temps reel directement dans le logiciel. Manipulez, zoomez, exportez.",
    icon: "&#x1F4D0;",
  },
  {
    title: "Calculs Eurocode 5",
    description: "Verifications structurelles automatiques selon les normes en vigueur. Sections, charges, fleches.",
    icon: "&#x2696;",
  },
  {
    title: "Export PDF",
    description: "Devis professionnel pret a envoyer au client. Personnalisable avec votre logo et coordonnees.",
    icon: "&#x1F4C4;",
  },
  {
    title: "Catalogue prix",
    description: "Renseignez vos prix une fois, DEVIA les applique automatiquement a tous vos devis futurs.",
    icon: "&#x1F4B0;",
  },
  {
    title: "Multi-projets",
    description: "Gerez tous vos chantiers depuis une interface unique. Historique, modifications, suivi.",
    icon: "&#x1F4C2;",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Tout ce dont vous avez besoin
              <br />
              <span className="text-amber-600">pour des devis pros.</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              DEVIA est concu pour remplacer entierement votre processus actuel
              de chiffrage. Toutes les etapes, dans un seul outil.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-slate-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4" dangerouslySetInnerHTML={{ __html: f.icon }} />
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link
              href="/tarifs"
              className="inline-flex items-center bg-slate-900 text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-slate-800 transition-colors"
            >
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
