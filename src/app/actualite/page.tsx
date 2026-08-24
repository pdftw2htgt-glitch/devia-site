import Link from "next/link";

export const metadata = {
  title: "Actualite - DEVIA",
  description: "Les nouveautes du logiciel DEVIA : nouvelles fonctionnalites, ameliorations de calcul, evolutions de la 3D.",
};

const news = [
  {
    date: "24 août 2026",
    title: "Un devis PDF digne d'un dossier d'étude",
    description: "Perspective du projet et charges de calcul en en-tête, prix présentés par catégorie avec le détail des pièces, vues 3D en pleine page à la suite du devis. Et les quantités des postes bois sont désormais imposées par le métré du moteur 3D.",
  },
  {
    date: "24 août 2026",
    title: "Le stock fournisseur enregistré dans DEVIA",
    description: "Près d'une centaine de références structurelles (contrecollé, lamellé-collé, KVH, ossature, LVL) avec leurs longueurs commerciales. Une panne part d'une seule pièce jusqu'à 13 m en contrecollé, et le devis cite la référence exacte.",
  },
  {
    date: "16 août 2026",
    title: "Noues : la greffe de toiture comme sur le chantier",
    description: "Une aile plus basse pénètre le pan du corps principal : noues posées sur la charpente porteuse, faîtière prolongée dans le pan, empannons, couverture découpée le long des noues. La règle métier, pas une approximation.",
  },
  {
    date: "16 août 2026",
    title: "Dépassés de toiture sur toute la chaîne",
    description: "Lus sur le plan par l'analyse, modifiables dans la décomposition manuelle, rendus en 3D : chevrons prolongés, queues de pannes, chevrons de rive. Le contour du plan de toitures n'est plus jamais confondu avec les murs.",
  },
  {
    date: "13 août 2026",
    title: "Export IFC : l'assemblage réel, pièce par pièce",
    description: "Le fichier IFC reprend l'assemblage complet du projet : chaque pièce part avec sa position, son orientation et sa section exactes vers vos logiciels de conception.",
  },
  {
    date: "27 juillet 2026",
    title: "Vérification au flambement généralisée",
    description: "Poinçons, contrefiches et consoles de balcon sont désormais dimensionnés en compression avec vérification du flambement selon Eurocode 5, sur la base des tables officielles.",
  },
  {
    date: "26 juillet 2026",
    title: "Panneaux solaires sur hangars et monopentes",
    description: "Le calepinage photovoltaïque arrive sur les toitures agricoles et monopentes : pose réglementaire avec marges de sécurité, et charge structurelle intégrée au calcul des sections.",
  },
  {
    date: "26 juillet 2026",
    title: "Un seul moteur de calcul, partout",
    description: "Devis, visualisation 3D et tableau de vérification affichent désormais exactement les mêmes sections, y compris les sections régionales de montagne. Une seule vérité, du formulaire au PDF.",
  },
  {
    date: "26 juillet 2026",
    title: "Géométrie de hangar niveau traditionnel",
    description: "Pannes d'aplomb calées sur échantignoles, coupes d'onglet au faîtage, liens de faîtage : la charpente de hangar atteint le niveau de détail de la charpente traditionnelle.",
  },
  {
    date: "24 juillet 2026",
    title: "Consoles de balcon calculées",
    description: "Les balcons en porte-à-faux reçoivent leurs consoles à trois pièces, dimensionnées selon la charge réglementaire des balcons d'habitation, et ancrées sur la face réelle des murs.",
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
              Nouvelles fonctionnalités, améliorations du calcul, évolutions de la 3D :
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
          <p className="text-xl text-slate-300 mb-10">DEVIA est développé en continu avec des charpentiers professionnels.</p>
          <Link href="/tarifs" className="inline-flex items-center bg-amber-500 text-slate-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-amber-400 transition-colors">
            Rejoindre DEVIA
          </Link>
        </div>
      </section>
    </>
  );
}
