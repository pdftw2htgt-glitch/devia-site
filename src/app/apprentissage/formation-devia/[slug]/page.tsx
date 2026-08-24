import Link from "next/link";
import { notFound } from "next/navigation";

const guides = [
  {
    slug: "devis-standard", num: "01",
    title: "La création de devis standard",
    intro: "Pour tout devis sans difficulté géométrique ni complexité particulière de charpente, DEVIA propose un formulaire de création simple et intuitif : vous décrivez, DEVIA génère.",
    etapes: [
      { t: "Nommez votre projet", d: "Donnez un nom à votre projet et associez-le à un groupe pour le retrouver facilement." },
      { t: "Décrivez votre ouvrage", d: "Type de structure, dimensions, pente : décrivez votre projet et les détails que vous voulez lui donner." },
      { t: "Choisissez l'esthétique", d: "Couverture, essence du bois, finition : l'apparence que vous souhaitez pour l'ouvrage." },
      { t: "Renseignez la localisation", d: "Indiquez la commune : vent, neige, séisme et altitude s'actualisent tout seuls." },
      { t: "Générez votre devis", d: "Choisissez le marché de matériaux à utiliser - le vôtre ou celui de DEVIA - et lancez la génération." },
    ],
  },
  {
    slug: "importer-un-plan", num: "02",
    title: "Un devis complet depuis un plan PDF ou une photo",
    intro: "DEVIA possède trois modes de création : le formulaire pour les devis simples, le multi-ouvrages pour les projets plus imposants sans complexité géométrique particulière, et l'import de plans PDF ou de photos. Ce mode analyse les plans d'un ouvrage neuf, en extrait les données de fabrication, pré-remplit le formulaire et conserve la géométrie des structures. Un processus automatisé, qui ne demande qu'une action de votre part.",
    etapes: [
      { t: "Ajoutez vos documents", d: "Dans le formulaire, cliquez sur le bouton d'ajout de fichiers et importez votre plan PDF ou votre photo." },
      { t: "Lancez l'analyse", d: "DEVIA lit le dossier : dimensions, hauteurs, pente, commune et décomposition des volumes sont extraites et pré-remplies." },
      { t: "Vérifiez et générez", d: "Contrôlez la lecture proposée, ajustez si besoin, puis générez : le devis et la 3D reprennent la géométrie du plan." },
    ],
  },
  {
    slug: "multi-ouvrages", num: "03",
    title: "Multiplier les ouvrages dans un seul devis",
    intro: "Le mode standard du formulaire crée un seul ouvrage. En choisissant Structure personnalisée dans le champ Type de structure, vous accumulez plusieurs ouvrages sur un même rendu 3D et un même devis : l'intelligence de DEVIA analyse et choisit l'emplacement et l'organisation de chaque ouvrage ajouté autour de l'ouvrage de base, dans le respect des règles de construction.",
    etapes: [
      { t: "Choisissez Structure personnalisée", d: "Dans le formulaire, champ Type de structure : sélectionnez Structure personnalisée pour passer en mode multi-ouvrages." },
      { t: "Accumulez les ouvrages", d: "Décrivez l'ouvrage de base puis ajoutez les suivants - maison, garage, sas, balcon - chacun avec ses dimensions." },
      { t: "Laissez DEVIA assembler", d: "Chaque ouvrage est calculé pour lui-même, puis positionné et organisé autour de l'ouvrage de base. Un seul rendu 3D, un seul devis." },
    ],
  },
  {
    slug: "catalogue-de-prix", num: "04",
    title: "Apportez votre propre catalogue à vos projets",
    intro: "DEVIA possède nativement un catalogue de prix basé sur une moyenne du marché, actualisé régulièrement : vos projets sont chiffrés sur les prix du marché DEVIA. En apportant vos matériaux et leurs prix, ce sont eux qui s'appliquent à vos projets - et le marché DEVIA complète pour les matériaux manquants de votre catalogue.",
    etapes: [
      { t: "Remplissez votre catalogue", d: "Page Catalogue : ajoutez vos matériaux avec leur désignation, leur unité et votre prix." },
      { t: "Choisissez le catalogue du devis", d: "Au moment de générer, sélectionnez Mon catalogue : vos prix s'appliquent en priorité au chiffrage." },
      { t: "Complétez avec le marché", d: "Pour les matériaux absents de votre catalogue, DEVIA complète automatiquement avec les prix du marché." },
    ],
  },
  {
    slug: "tableau-calcul", num: "05",
    title: "Sections mini ou conseillées",
    intro: "DEVIA propose aux professionnels - charpentiers comme bureaux d'études - deux types de sections calculées selon l'Eurocode 5. Les sections MINI sont les sections minimum requises pour qu'un élément tienne l'ouvrage : le résultat strict du calcul. Les sections CONSEILLÉES répondent à l'usage métier et aux attentes esthétiques de la région.",
    etapes: [
      { t: "Ouvrez l'onglet Calcul", d: "Après la génération, l'onglet Calcul affiche charges permanentes, neige, vent et vérifications Eurocode 5 selon votre commune." },
      { t: "Lisez la section mini", d: "La section minimum requise par le calcul pour chaque élément de l'ouvrage." },
      { t: "Comparez avec la conseillée", d: "La section d'usage métier et régional, affichée par défaut - un bouton permet de basculer entre mini et conseillée sur la vue 3D." },
    ],
  },
  {
    slug: "export-pdf-ifc", num: "06",
    title: "Donnez du sens à votre travail",
    intro: "La force de DEVIA est de vous accompagner de A à Z dans votre projet. Une fois le devis terminé, exportez le PDF pour le présenter au client. S'il donne suite au chantier, DEVIA exporte la structure 3D vers vos logiciels de conception habituels grâce à l'export IFC - pour continuer vos travaux là où DEVIA s'arrête.",
    etapes: [
      { t: "Exportez le devis PDF", d: "Logo, coordonnées, postes chiffrés et vues 3D : le document est prêt à être présenté au client." },
      { t: "Le client valide", d: "Le devis devient chantier : la structure calculée dans DEVIA sert de base à la suite des travaux." },
      { t: "Exportez en IFC", d: "Bouton Exporter IFC sur la vue 3D : chaque pièce part avec sa position, son orientation et sa section vers vos logiciels de conception." },
    ],
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
            <p className="text-sm font-semibold tracking-wide text-slate-500">Vidéo pas-à-pas à venir</p>
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
