import Link from "next/link";
import { notFound } from "next/navigation";

const guides = [
  {
    slug: "devis-standard", num: "01",
    title: "La creation de devis standard",
    intro: "Pour tout devis sans difficulte geometrique ni complexite particuliere de charpente, DEVIA propose un formulaire de creation simple et intuitif : vous decrivez, DEVIA genere.",
    etapes: [
      { t: "Nommez votre projet", d: "Donnez un nom a votre projet et associez-le a un groupe pour le retrouver facilement." },
      { t: "Decrivez votre ouvrage", d: "Type de structure, dimensions, pente : decrivez votre projet et les details que vous voulez lui donner." },
      { t: "Choisissez l'esthetique", d: "Couverture, essence du bois, finition : l'apparence que vous souhaitez pour l'ouvrage." },
      { t: "Renseignez la localisation", d: "Indiquez la commune : vent, neige, seisme et altitude s'actualisent tout seuls." },
      { t: "Generez votre devis", d: "Choisissez le marche de materiaux a utiliser - le votre ou celui de DEVIA - et lancez la generation." },
    ],
  },
  {
    slug: "importer-un-plan", num: "02",
    title: "Un devis complet depuis un plan PDF ou une photo",
    intro: "DEVIA possede trois modes de creation : le formulaire pour les devis simples, le multi-ouvrages pour les projets plus imposants sans complexite geometrique particuliere, et l'import de plans PDF ou de photos. Ce mode analyse les plans d'un ouvrage neuf, en extrait les donnees de fabrication, pre-remplit le formulaire et conserve la geometrie des structures. Un processus automatise, qui ne demande qu'une action de votre part.",
    etapes: [
      { t: "Ajoutez vos documents", d: "Dans le formulaire, cliquez sur le bouton d'ajout de fichiers et importez votre plan PDF ou votre photo." },
      { t: "Lancez l'analyse", d: "DEVIA lit le dossier : dimensions, hauteurs, pente, commune et decomposition des volumes sont extraites et pre-remplies." },
      { t: "Verifiez et generez", d: "Controlez la lecture proposee, ajustez si besoin, puis generez : le devis et la 3D reprennent la geometrie du plan." },
    ],
  },
  {
    slug: "multi-ouvrages", num: "03",
    title: "Multiplier les ouvrages dans un seul devis",
    intro: "Le mode standard du formulaire cree un seul ouvrage. En choisissant Structure personnalisee dans le champ Type de structure, vous accumulez plusieurs ouvrages sur un meme rendu 3D et un meme devis : l'intelligence de DEVIA analyse et choisit l'emplacement et l'organisation de chaque ouvrage ajoute autour de l'ouvrage de base, dans le respect des regles de construction.",
    etapes: [
      { t: "Choisissez Structure personnalisee", d: "Dans le formulaire, champ Type de structure : selectionnez Structure personnalisee pour passer en mode multi-ouvrages." },
      { t: "Accumulez les ouvrages", d: "Decrivez l'ouvrage de base puis ajoutez les suivants - maison, garage, sas, balcon - chacun avec ses dimensions." },
      { t: "Laissez DEVIA assembler", d: "Chaque ouvrage est calcule pour lui-meme, puis positionne et organise autour de l'ouvrage de base. Un seul rendu 3D, un seul devis." },
    ],
  },
  {
    slug: "catalogue-de-prix", num: "04",
    title: "Renseigner votre catalogue de prix",
    intro: "Importez vos prix d'entreprise : DEVIA les applique en priorite a tous vos devis, et peut completer avec les prix du marche.",
    etapes: [],
  },
  {
    slug: "tableau-calcul", num: "05",
    title: "Lire le tableau Calcul",
    intro: "Sections mini (calcul strict) et sections conseillees (usage metier et regional) : comprenez ce que DEVIA verifie selon Eurocode 5.",
    etapes: [],
  },
  {
    slug: "export-pdf-ifc", num: "06",
    title: "Exporter en PDF et IFC",
    intro: "Le devis final avec vues 3D pour votre client, et l'export IFC pour vos autres logiciels de conception.",
    etapes: [],
  },
];

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  if (g === undefined) return {};
  return { title: g.title + " - Formation DEVIA", description: g.intro };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  if (g === undefined) notFound();
  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-widest text-amber-600 uppercase mb-4">Formation DEVIA - Guide {g.num}</p>
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">{g.title}</h1>
            <p className="text-xl text-slate-600 leading-relaxed">{g.intro}</p>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          {g.etapes.length > 0 ? (
            <>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-10">Comment faire</h2>
              <div className="space-y-8">
                {g.etapes.map((e, i) => (
                  <div key={e.t} className="flex gap-5">
                    <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-900 font-bold flex items-center justify-center shrink-0">{i + 1}</div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{e.t}</h3>
                      <p className="text-slate-600 leading-relaxed">{e.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-slate-500">
              Le guide detaille est en cours de redaction et arrive bientot sur cette page.
            </p>
          )}
          <div className="mt-16 rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
            <p className="text-sm font-semibold tracking-wide text-slate-500">Video pas-a-pas a venir</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-lg text-slate-600 mb-8">Besoin d'aller plus vite ? Demandez une session en visio.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apprentissage/formation-devia" className="inline-flex items-center justify-center border border-slate-300 text-slate-700 px-8 py-4 rounded-lg text-base font-semibold hover:bg-white transition-colors">Tous les guides</Link>
            <Link href="/contact" className="inline-flex items-center justify-center bg-amber-500 text-slate-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-amber-400 transition-colors">Nous contacter</Link>
          </div>
        </div>
      </section>
    </>
  );
}
