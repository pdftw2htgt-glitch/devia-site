import Link from "next/link";

export const metadata = {
  title: "Apprentissage - DEVIA",
  description: "Guides pas-a-pas pour maitriser DEVIA : premier devis, import de plan, multi-ouvrages, catalogue de prix, calculs Eurocode.",
};

const guides = [
  {
    num: "01",
    title: "Votre premier devis en quelques secondes",
    description: "Decrivez le projet en langage naturel, ou collez le mail de votre client. DEVIA detecte le type de structure, genere le devis et la 3D.",
  },
  {
    num: "02",
    title: "Importer un plan PDF ou une photo",
    description: "Deposez le document : dimensions, pente, hauteur et commune sont extraites et pre-remplies. Verifiez, ajustez, generez.",
  },
  {
    num: "03",
    title: "Creer un projet multi-ouvrages",
    description: "Ajoutez plusieurs structures a un meme projet : maison, balcon, appentis. DEVIA les calcule une par une et les assemble en 3D.",
  },
  {
    num: "04",
    title: "Renseigner votre catalogue de prix",
    description: "Importez vos prix d'entreprise : DEVIA les applique en priorite a tous vos devis, et peut completer avec les prix du marche.",
  },
  {
    num: "05",
    title: "Lire le tableau Calcul",
    description: "Sections mini (calcul strict) et sections conseillees (usage metier et regional) : comprenez ce que DEVIA verifie selon Eurocode 5.",
  },
  {
    num: "06",
    title: "Exporter en PDF et IFC",
    description: "Le devis final avec vues 3D pour votre client, et l'export IFC pour vos autres logiciels de conception.",
  },
];

export default function ApprentissagePage() {
  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Maitrisez DEVIA
              <br />
              <span className="text-amber-600">en quelques minutes.</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Pas de formation de trois jours. Des guides courts et concrets,
              penses pour des professionnels qui ont des chantiers a faire tourner.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((g) => (
              <div key={g.num} className="bg-slate-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
                <div className="text-amber-600 font-bold text-sm mb-3">{g.num}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{g.title}</h3>
                <p className="text-slate-600 leading-relaxed">{g.description}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-500 mt-12">
            Guides detailles et videos pas-a-pas : bientot disponibles sur cette page.
          </p>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-6">Une question sur l'utilisation ?</h2>
          <p className="text-xl text-slate-300 mb-10">Notre equipe repond aux professionnels rapidement.</p>
          <Link href="/contact" className="inline-flex items-center bg-amber-500 text-slate-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-amber-400 transition-colors">
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  );
}
