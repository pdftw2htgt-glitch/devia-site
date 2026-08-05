import Link from "next/link";

export const metadata = {
  title: "Apprentissage - DEVIA",
  description: "Formation DEVIA, programmes d'accompagnement et aide : maitrisez le logiciel de devis charpente en quelques minutes.",
};

const guides = [
  { num: "01", title: "Votre premier devis en quelques secondes", description: "Decrivez le projet en langage naturel, ou collez le mail de votre client. DEVIA detecte le type de structure, genere le devis et la 3D." },
  { num: "02", title: "Importer un plan PDF ou une photo", description: "Deposez le document : dimensions, pente, hauteur et commune sont extraites et pre-remplies. Verifiez, ajustez, generez." },
  { num: "03", title: "Creer un projet multi-ouvrages", description: "Ajoutez plusieurs structures a un meme projet : maison, balcon, appentis. DEVIA les calcule une par une et les assemble en 3D." },
  { num: "04", title: "Renseigner votre catalogue de prix", description: "Importez vos prix d'entreprise : DEVIA les applique en priorite a tous vos devis, et peut completer avec les prix du marche." },
  { num: "05", title: "Lire le tableau Calcul", description: "Sections mini (calcul strict) et sections conseillees (usage metier et regional) : comprenez ce que DEVIA verifie selon Eurocode 5." },
  { num: "06", title: "Exporter en PDF et IFC", description: "Le devis final avec vues 3D pour votre client, et l'export IFC pour vos autres logiciels de conception." },
];

const programmes = [
  {
    title: "Artisan solo",
    desc: "DEVIA s'apprend sur VOTRE premier vrai devis : une demi-journee en visio, votre catalogue renseigne, vos habitudes de chiffrage integrees. Vous terminez la session avec un devis pret a envoyer.",
    tag: "Demi-journee en visio",
  },
  {
    title: "Entreprise",
    desc: "DEVIA se deploie dans votre equipe : formation sur site ou a distance, catalogue et regles metier integres a l'installation. Chacun repart autonome sur ses propres projets. Inclus dans la formule personnalisee.",
    tag: "Sur site ou a distance",
  },
  {
    title: "Lycees & formation",
    desc: "DEVIA entre en atelier : les eleves decrivent l'ouvrage, le logiciel genere la structure, et le tableau Eurocode 5 explique chaque section. Un support pedagogique construit avec des enseignants de la filiere bois.",
    tag: "En construction",
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
              Pas de formation de trois jours. Des guides courts, des programmes
              d'accompagnement, et une equipe qui repond.
            </p>
          </div>
        </div>
      </section>

      <section id="formation-devia" className="py-20 border-t border-slate-200 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-3">Formation DEVIA</h2>
            <p className="text-lg text-slate-600">Prenez en main le logiciel pas a pas, guide par guide.</p>
          </div>
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

      <section id="nos-programmes" className="py-20 bg-slate-50 border-t border-slate-200 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-3">Nos programmes</h2>
            <p className="text-lg text-slate-600">Un accompagnement selon votre profil, a reserver via la page Contact.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {programmes.map((p) => (
              <div key={p.title} className="bg-white border border-slate-200 rounded-2xl p-8">
                <div className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold mb-4">{p.tag}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{p.title}</h3>
                <p className="text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="aide" className="py-20 border-t border-slate-200 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Aide</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Une question, un blocage, une idee ? Le support par email est inclus :
            30 jours avec la formule standard, prioritaire et illimite avec la maintenance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center bg-amber-500 text-slate-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-amber-400 transition-colors">Nous contacter</Link>
            <Link href="/tarifs" className="inline-flex items-center justify-center border border-slate-300 text-slate-700 px-8 py-4 rounded-lg text-base font-semibold hover:bg-slate-50 transition-colors">Voir les formules</Link>
          </div>
        </div>
      </section>
    </>
  );
}
