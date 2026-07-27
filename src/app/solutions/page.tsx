import Link from "next/link";

export const metadata = {
  title: "Solutions - DEVIA",
  description: "Charpente traditionnelle, hangar agricole, balcon, multi-ouvrages : DEVIA chiffre et modelise chaque type de structure bois.",
};

const solutions = [
  {
    title: "Charpente traditionnelle",
    description: "Fermes completes, pannes d'aplomb sur echantignoles, coupes d'onglet au faitage. Sections calculees selon Eurocode 5, avec les sections regionales de montagne quand l'altitude l'exige.",
  },
  {
    title: "Hangar agricole",
    description: "Grandes portees, poteaux dimensionnes au flambement, geometrie de niveau traditionnel. Panneaux solaires calepines sur le pan avec la charge integree directement au calcul de structure.",
  },
  {
    title: "Balcon et garde-corps",
    description: "Balcon bois en porte-a-faux avec consoles dimensionnees en compression et flambement. Garde-corps conformes NF P01-012, barreaudage calepine automatiquement.",
  },
  {
    title: "Projets multi-ouvrages",
    description: "Une maison, son balcon et son appentis dans un seul devis. Chaque ouvrage est calcule individuellement puis assemble en 3D sur la meme scene, avec un devis fusionne par ouvrage.",
  },
  {
    title: "Monopente, carport, terrasse, MOB",
    description: "Ateliers, garages, abris voiture, terrasses sur plots ou poteaux, murs a ossature bois avec baies : la gamme complete des petits ouvrages du quotidien.",
  },
  {
    title: "Import de plan",
    description: "Deposez un plan PDF ou une photo : DEVIA lit les dimensions, la pente, la commune du cartouche, et pre-remplit le projet. Le plan fait foi lors de la generation.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Une solution pour
              <br />
              <span className="text-amber-600">chaque ouvrage.</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Du carport au hangar agricole, DEVIA connait la geometrie, les regles
              de calcul et les pieces de chaque type de structure bois.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((s) => (
              <div key={s.title} className="bg-slate-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
                <p className="text-slate-600 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-6">Votre ouvrage est dans la liste ?</h2>
          <p className="text-xl text-slate-300 mb-10">Decrivez-le a DEVIA et jugez le resultat par vous-meme.</p>
          <Link href="/tarifs" className="inline-flex items-center bg-amber-500 text-slate-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-amber-400 transition-colors">
            Voir les tarifs
          </Link>
        </div>
      </section>
    </>
  );
}
