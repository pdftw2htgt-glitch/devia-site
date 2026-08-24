import Link from "next/link";

export const metadata = {
  title: "Formation DEVIA - Apprentissage",
  description: "Prenez DEVIA en main pas a pas : premier devis, import de plans, catalogue de prix, tableau Eurocode 5, exports PDF et IFC.",
};

const points = [
  "Generer un devis complet a partir d'un mail de client ou d'un plan PDF.",
  "Lire le tableau de calcul : sections mini, sections conseillees, verifications Eurocode 5.",
  "Exporter le devis en PDF pour votre client et la structure en IFC pour vos autres logiciels.",
];

const guides = [
  { slug: "devis-standard", num: "01", title: "Votre premier devis en quelques secondes", description: "Decrivez le projet en langage naturel, ou collez le mail de votre client. DEVIA detecte le type de structure, genere le devis et la 3D." },
  { slug: "importer-un-plan", num: "02", title: "Importer un plan PDF ou une photo", description: "Deposez le document : dimensions, pente, hauteur et commune sont extraites et pre-remplies. Verifiez, ajustez, generez." },
  { slug: "multi-ouvrages", num: "03", title: "Creer un projet multi-ouvrages", description: "Ajoutez plusieurs structures a un meme projet : maison, balcon, appentis. DEVIA les calcule une par une et les assemble en 3D." },
  { slug: "catalogue-de-prix", num: "04", title: "Renseigner votre catalogue de prix", description: "Importez vos prix d'entreprise : DEVIA les applique en priorite a tous vos devis, et peut completer avec les prix du marche." },
  { slug: "tableau-calcul", num: "05", title: "Lire le tableau Calcul", description: "Sections mini (calcul strict) et sections conseillees (usage metier et regional) : comprenez ce que DEVIA verifie selon Eurocode 5." },
  { slug: "export-pdf-ifc", num: "06", title: "Exporter en PDF et IFC", description: "Le devis final avec vues 3D pour votre client, et l'export IFC pour vos autres logiciels de conception." },
];

export default function FormationDeviaPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-widest text-amber-600 uppercase mb-4">Apprentissage</p>
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">Formation DEVIA</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              DEVIA s'apprend en pratiquant. Chaque guide part d'un cas reel : un mail de
              client, un plan PDF, un catalogue de prix. En six guides courts, vous savez
              generer, verifier et exporter un devis complet.
            </p>
            <div className="mt-8 space-y-3">
              {points.map((p) => (
                <div key={p} className="flex items-start gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 mt-0.5 shrink-0">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <p className="text-slate-700">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-3">Les 6 guides</h2>
            <p className="text-lg text-slate-600">Dans l'ordre ou vous en aurez besoin, du premier devis a l'export.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((g) => (
              <Link key={g.num} href={"/apprentissage/formation-devia/" + g.slug} className="block bg-slate-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
                <div className="text-amber-600 font-bold text-sm mb-3">{g.num}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{g.title}</h3>
                <p className="text-slate-600 leading-relaxed">{g.description}</p>
                <p className="text-amber-600 font-semibold text-sm mt-4">Lire le guide →</p>
              </Link>
            ))}
          </div>
          <p className="text-center text-slate-500 mt-12">
            Les videos pas-a-pas arrivent une a une sur cette page. Besoin d'aller plus vite ? Demandez une session en visio depuis la page contact.
          </p>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Besoin d'un accompagnement ?</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Nos programmes vous forment sur vos propres projets : artisan solo, equipe
            d'entreprise ou filiere de formation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apprentissage/programmes" className="inline-flex items-center justify-center bg-amber-500 text-slate-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-amber-400 transition-colors">Voir nos programmes</Link>
            <Link href="/contact" className="inline-flex items-center justify-center border border-slate-300 text-slate-700 px-8 py-4 rounded-lg text-base font-semibold hover:bg-slate-50 transition-colors">Nous contacter</Link>
          </div>
        </div>
      </section>
    </>
  );
}
