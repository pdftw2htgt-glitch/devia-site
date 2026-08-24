import Link from "next/link";

export const metadata = {
  title: "Actualite - DEVIA",
  description: "Les nouveautes du logiciel DEVIA : nouvelles fonctionnalites, ameliorations de calcul, evolutions de la 3D.",
};

const news = [
  {
    date: "24 aout 2026",
    title: "Un devis PDF digne d'un dossier d'etude",
    description: "Perspective du projet et charges de calcul en en-tete, prix presentes par categorie avec le detail des pieces, vues 3D en pleine page a la suite du devis. Et les quantites des postes bois sont desormais imposees par le metre du moteur 3D.",
  },
  {
    date: "24 aout 2026",
    title: "Le stock fournisseur enregistre dans DEVIA",
    description: "Pres d'une centaine de references structurelles (contrecolle, lamelle-colle, KVH, ossature, LVL) avec leurs longueurs commerciales. Une panne part d'une seule piece jusqu'a 13 m en contrecolle, et le devis cite la reference exacte.",
  },
  {
    date: "16 aout 2026",
    title: "Noues : la greffe de toiture comme sur le chantier",
    description: "Une aile plus basse penetre le pan du corps principal : noues posees sur la charpente porteuse, faitiere prolongee dans le pan, empannons, couverture decoupee le long des noues. La regle metier, pas une approximation.",
  },
  {
    date: "16 aout 2026",
    title: "Depasses de toiture sur toute la chaine",
    description: "Lus sur le plan par l'analyse, modifiables dans la decomposition manuelle, rendus en 3D : chevrons prolonges, queues de pannes, chevrons de rive. Le contour du plan de toitures n'est plus jamais confondu avec les murs.",
  },
  {
    date: "13 aout 2026",
    title: "Export IFC : l'assemblage reel, piece par piece",
    description: "Le fichier IFC reprend l'assemblage complet du projet : chaque piece part avec sa position, son orientation et sa section exactes vers vos logiciels de conception.",
  },
  {
    date: "27 juillet 2026",
    title: "Verification au flambement generalisee",
    description: "Poincons, contrefiches et consoles de balcon sont desormais dimensionnes en compression avec verification du flambement selon Eurocode 5, sur la base des tables officielles.",
  },
  {
    date: "26 juillet 2026",
    title: "Panneaux solaires sur hangars et monopentes",
    description: "Le calepinage photovoltaique arrive sur les toitures agricoles et monopentes : pose reglementaire avec marges de securite, et charge structurelle integree au calcul des sections.",
  },
  {
    date: "26 juillet 2026",
    title: "Un seul moteur de calcul, partout",
    description: "Devis, visualisation 3D et tableau de verification affichent desormais exactement les memes sections, y compris les sections regionales de montagne. Une seule verite, du formulaire au PDF.",
  },
  {
    date: "26 juillet 2026",
    title: "Geometrie de hangar niveau traditionnel",
    description: "Pannes d'aplomb calees sur echantignoles, coupes d'onglet au faitage, liens de faitage : la charpente de hangar atteint le niveau de detail de la charpente traditionnelle.",
  },
  {
    date: "24 juillet 2026",
    title: "Consoles de balcon calculees",
    description: "Les balcons en porte-a-faux recoivent leurs consoles a trois pieces, dimensionnees selon la charge reglementaire des balcons d'habitation, et ancrees sur la face reelle des murs.",
  },
];

export default function ActualitePage() {
  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">
              DEVIA evolue
              <br />
              <span className="text-amber-600">chaque semaine.</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Nouvelles fonctionnalites, ameliorations du calcul, evolutions de la 3D :
              suivez ici tout ce qui change dans le logiciel.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-8">
            {news.map((n) => (
              <div key={n.title} className="bg-slate-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
                <div className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold mb-4">{n.date}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{n.title}</h3>
                <p className="text-slate-600 leading-relaxed">{n.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-6">Un logiciel vivant.</h2>
          <p className="text-xl text-slate-300 mb-10">DEVIA est developpe en continu avec des charpentiers professionnels.</p>
          <Link href="/tarifs" className="inline-flex items-center bg-amber-500 text-slate-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-amber-400 transition-colors">
            Rejoindre DEVIA
          </Link>
        </div>
      </section>
    </>
  );
}
