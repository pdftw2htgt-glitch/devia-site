import Link from "next/link";
import { notFound } from "next/navigation";

const solutions = [
  {
    slug: "charpente-traditionnelle", eyebrow: "Charpente traditionnelle",
    title: "La charpente traditionnelle, recréée par l'IA",
    intro: "DEVIA reconstruit toutes vos charpentes traditionnelles grâce à l'IA et aux instructions que vous lui donnez. En s'appuyant sur les normes de construction en vigueur, ou sur vos propres spécificités, elle recrée une charpente prête à être présentée au client puis exportée.",
    points: ["Fermes complètes et réalistes : entrait, arbalétriers, poinçon, contrefiches et liens de faîtage", "Chaque pièce vérifiée : flexion, flèche, compression et flambement", "Ajustement des sections d'usage selon la région, pour un rendu plus esthétique"],
    d1: "La structure est générée pièce par pièce avec ses règles de métier : fermes à entraxe régulier, pannes d'aplomb calées sur leurs échantignoles, chevrons répartis par travée. Le résultat se lit comme un plan d'exécution, pas comme un dessin d'illustration.",
    d2: "Chaque type de pièce reçoit sa vérification Eurocode 5 avec les charges de neige et de vent de votre commune, altitude comprise. En zone de montagne, les sections d'usage régional passent en tête dès qu'elles tiennent le calcul.",
    etapes: [{ t: "Décrivez", d: "Type, dimensions, pente, commune - ou collez le mail du client." }, { t: "Vérifiez", d: "3D complète et tableau Eurocode 5 en quelques secondes." }, { t: "Envoyez", d: "Devis PDF avec vues 3D, nomenclature et prix." }],
    c: "#f59e0b", txt: "#b45309", tint: "#fffbeb",
  },
  {
    slug: "charpente-industrielle", eyebrow: "Charpente industrielle",
    title: "La fermette, chiffrée en série",
    intro: "DEVIA chiffre vos charpentes industrielles à fermettes à partir d'une simple description. Elle calcule la série, compte les pièces et applique vos prix : le devis de la toiture économique, sans y passer l'après-midi.",
    points: ["Série de fermettes générée à entraxe régulier", "Quantités et métré calculés automatiquement", "Vos prix appliqués via votre catalogue"],
    d1: "La charpente industrielle vit de la répétition : DEVIA génère la série, la compte et la chiffre d'un seul geste. Vous ajustez la portée ou l'entraxe, tout se recalcule.",
    d2: "Le calcul est déterministe : mêmes entrées, mêmes sorties. Un devis de fermettes reste comparable d'un projet à l'autre, et défendable devant le client.",
    etapes: [{ t: "Décrivez", d: "Portée, longueur, pente de la toiture." }, { t: "Vérifiez", d: "La série et ses quantités s'affichent." }, { t: "Envoyez", d: "Le devis complet part en quelques minutes." }],
    c: "#3b82f6", txt: "#1d4ed8", tint: "#eff6ff",
  },
  {
    slug: "construction-bois", eyebrow: "Construction bois",
    title: "L'ossature bois, murs compris",
    intro: "DEVIA maîtrise la construction bois : des murs à ossature bois aux caissons de toiture, jusqu'à la charpente de votre projet. Elle connaît chaque pièce et chaque règle d'or de la construction bois - la structure complète, prête à présenter.",
    points: ["MOB : montants, lisse basse, lisse haute, lisse d'ancrage et lisse de chaînage", "Baies avec montants doubles, linteaux et allèges", "Bardage extérieur, voile OSB et planchers"],
    d1: "Vous décrivez le bâtiment, DEVIA lève les murs : chaque baie reçoit ses renforts automatiquement, et la charpente vient se poser sur l'ossature dans la même scène 3D.",
    d2: "Le métré réunit murs et toiture dans une seule nomenclature chiffrée : sections, longueurs, volumes et poids, prêts pour le débit.",
    etapes: [{ t: "Décrivez", d: "Emprise, hauteur, niveaux, ouvertures." }, { t: "Vérifiez", d: "Ossature et charpente s'assemblent en 3D." }, { t: "Envoyez", d: "Le devis couvre la structure complète." }],
    c: "#8b5cf6", txt: "#6d28d9", tint: "#f5f3ff",
  },
  {
    slug: "charpente-couverture", eyebrow: "Charpente couverture",
    title: "La couverture, posée sur le calcul",
    intro: "DEVIA intègre la couverture à votre chiffrage : tuiles ou bac acier, elle pèse son poids réel dans le calcul des sections, et compte liteaux et surfaces avec le reste.",
    points: ["Poids de la couverture intégré à la descente de charges", "Liteaux et calepinage comptés automatiquement", "Surfaces et quantités prêtes pour la commande"],
    d1: "Changer de couverture change la structure : DEVIA répercute le poids du matériau choisi dans le calcul, et les sections suivent.",
    d2: "Le rendu 3D réaliste affiche la couverture choisie, et le devis détaille surfaces et quantités pour la commande.",
    etapes: [{ t: "Choisissez", d: "Le type de couverture dans le formulaire." }, { t: "Vérifiez", d: "Sections et quantités s'adaptent en direct." }, { t: "Envoyez", d: "Le devis intègre structure et couverture." }],
    c: "#10b981", txt: "#047857", tint: "#ecfdf5",
  },
  {
    slug: "extension", eyebrow: "Extension",
    title: "Agrandir sans tout refaire",
    intro: "DEVIA accroche vos extensions à l'existant : appentis contre le gouttereau, balcon en façade avec sa porte-fenêtre, garage accolé au pignon. Elle les positionne, les calcule et les chiffre comme sur un vrai chantier.",
    points: ["Appentis, balcons et garages ancrés automatiquement", "Muraillère posée sur la face du mur, consoles calculées", "Un devis dédié pour chaque ouvrage ajouté"],
    d1: "L'ancrage est automatique et réaliste : chaque ouvrage connaît sa place, son orientation et ses pièces de liaison avec le bâtiment.",
    d2: "Les balcons reçoivent leurs consoles dimensionnées en compression et flambement, et leur garde-corps conforme NF P01-012.",
    etapes: [{ t: "Décrivez", d: "Le bâtiment principal et l'ouvrage à ajouter." }, { t: "Vérifiez", d: "L'assemblage s'affiche en 3D, déjà positionné." }, { t: "Envoyez", d: "Le devis distingue chaque ouvrage." }],
    c: "#f43f5e", txt: "#be123c", tint: "#fff1f2",
  },
  {
    slug: "multi-structure", eyebrow: "Multi-structure",
    title: "Plusieurs ouvrages, un seul devis",
    intro: "DEVIA réunit plusieurs ouvrages dans un seul projet : la maison, son balcon, son hangar. Chaque structure est calculée pour elle-même, puis tout est assemblé en 3D et fusionné dans un devis unique.",
    points: ["Chaque ouvrage calculé individuellement", "Assemblage 3D automatique sur une seule scène", "Devis fusionné avec sous-totaux par ouvrage"],
    d1: "Rien n'est mutualisé à l'aveugle : chaque ouvrage garde ses charges, ses sections et son métré.",
    d2: "Le PDF final présente le projet complet, vues 3D assemblées comprises. Votre client voit l'ensemble d'un coup d'œil.",
    etapes: [{ t: "Composez", d: "Ajoutez les structures une à une au projet." }, { t: "Vérifiez", d: "La scène 3D assemble tout, chaque calcul reste propre." }, { t: "Envoyez", d: "Un seul devis, lisible ouvrage par ouvrage." }],
    c: "#14b8a6", txt: "#0f766e", tint: "#f0fdfa",
  },
  {
    slug: "neuf-renovation", eyebrow: "Neuf & rénovation",
    title: "Du projet neuf à la reprise d'existant",
    intro: "DEVIA chiffre vos projets neufs de bout en bout, et vous accompagne en rénovation : elle analyse les plans et les photos de l'existant pour préparer l'intervention sur votre structure.",
    points: ["Projet neuf chiffré de la description au devis", "Rénovation : analyse des plans PDF et photos de l'existant", "Module reprise d'existant en développement"],
    d1: "Sur le neuf, tout y est : description ou plan en entrée, 3D, vérifications Eurocode 5 et devis chiffré en sortie.",
    d2: "Pour la rénovation, l'import de plans et l'ancrage sur existant sont déjà là. Le module complet de reprise d'existant est en développement - suivez la page Actualité.",
    etapes: [{ t: "Importez", d: "Le plan de l'existant ou la description du neuf." }, { t: "Vérifiez", d: "DEVIA pré-remplit et modélise." }, { t: "Envoyez", d: "Le devis part, neuf ou extension." }],
    c: "#6366f1", txt: "#4338ca", tint: "#eef2ff",
  },
  {
    slug: "etude-calcul", eyebrow: "Étude & calcul de structure",
    title: "L'Eurocode 5, sans bureau d'etudes",
    intro: "DEVIA vérifie votre structure selon l'Eurocode 5 : flexion, flèche, compression et flambement, avec les charges de neige et de vent de votre commune, altitude comprise.",
    points: ["Sections mini (calcul strict) et conseillées (usage métier)", "Charges climatiques récupérées par commune", "Hypothèses affichées, valeurs à valider par un professionnel"],
    d1: "Le moteur de calcul est unique : le devis, la 3D et le tableau de vérification lisent exactement les mêmes sections. Pas de double discours entre ce qui est dessiné et ce qui est chiffré.",
    d2: "Les hypothèses sont transparentes : portées, entraxes, combinaisons de charges. De quoi discuter d'égal à égal avec un bureau d'études.",
    etapes: [{ t: "Localisez", d: "La commune suffit : charges climatiques récupérées." }, { t: "Vérifiez", d: "Le tableau affiche mini, conseillée et hypothèses." }, { t: "Défendez", d: "Des valeurs traçables face à un bureau d'études." }],
    c: "#f97316", txt: "#c2410c", tint: "#fff7ed",
  },
  {
    slug: "logistique", eyebrow: "Logistique",
    title: "Le métré qui prépare le chantier",
    intro: "DEVIA prépare votre chantier dès le devis : nomenclature pièce par pièce, sections, longueurs, volumes et poids. Votre commande scierie est presque écrite.",
    points: ["Nomenclature complète générée avec la 3D", "Volumes et poids totaux par projet", "Assemblages recommandés par type de pièce"],
    d1: "Chaque pièce dessinée est comptée : rien dans la nomenclature qui ne soit dans la structure, et inversement.",
    d2: "Volumes et poids donnent l'ordre de grandeur du transport et du levage dès la phase de devis, et la liste des assemblages prépare l'atelier.",
    etapes: [{ t: "Générez", d: "Le projet produit son métré automatiquement." }, { t: "Vérifiez", d: "Nomenclature, volumes, poids : tout est là." }, { t: "Commandez", d: "La liste part chez votre scieur." }],
    c: "#06b6d4", txt: "#0e7490", tint: "#ecfeff",
  },
  {
    slug: "export-ifc", eyebrow: "Export IFC",
    title: "Compatible avec vos outils",
    intro: "DEVIA exporte vos structures au format IFC, le standard ouvert du bâtiment : vous retrouvez votre projet dans vos logiciels habituels, géométrie et placements conservés.",
    points: ["Export IFC en un clic depuis la 3D", "Géométrie, placements et identités des pièces conservés", "Compatible avec vos logiciels de conception"],
    d1: "DEVIA s'intègre à votre chaîne d'outils, il ne vous enferme pas : le standard IFC est lisible partout.",
    d2: "Chaque pièce part avec son placement exact - de quoi poursuivre la conception ou l'exécution ailleurs, sans ressaisie.",
    etapes: [{ t: "Générez", d: "Votre structure dans DEVIA." }, { t: "Exportez", d: "Un clic, un fichier IFC." }, { t: "Poursuivez", d: "Dans votre logiciel habituel." }],
    c: "#84cc16", txt: "#4d7c0f", tint: "#f7fee7",
  },
  {
    slug: "conception-chiffrage", eyebrow: "Conception & chiffrage",
    title: "Du plan au devis signé",
    intro: "DEVIA couvre toute la chaîne : vous déposez un plan ou décrivez le projet, elle conçoit la structure, la vérifie et la chiffre. Du premier mail du client au devis signé.",
    points: ["Plan, photo ou description libre en entrée", "3D, calculs et devis dans le même outil", "PDF final avec vues, nomenclature et prix"],
    d1: "La conception et le chiffrage ne sont plus deux mondes : la même description produit la 3D, les vérifications et le devis.",
    d2: "Avec votre catalogue renseigné, les prix sont les vôtres. Le PDF final réunit chiffrage et vues du projet : votre client voit ce qu'il signe.",
    etapes: [{ t: "Déposez", d: "Plan, photo ou simple description." }, { t: "Ajustez", d: "Dimensions, couverture, options du projet." }, { t: "Signez", d: "Le devis complet est chez le client." }],
    c: "#a855f7", txt: "#7e22ce", tint: "#faf5ff",
  },
];

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = solutions.find((x) => x.slug === slug);
  if (s === undefined) return { title: "Solutions - DEVIA" };
  return { title: s.eyebrow + " - DEVIA", description: s.intro };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = solutions.find((x) => x.slug === slug);
  if (s === undefined) notFound();

  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide mb-4" style={{ color: s.txt }}>
            <span className="w-2 h-2 rounded-full" style={{ background: s.c }} />
            {s.eyebrow}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">{s.title}</h1>
          <p className="text-xl text-slate-600 leading-relaxed">{s.intro}</p>
        </div>
      </section>

      <section className="py-14 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-5">Ce que DEVIA fait</h2>
            <ul className="space-y-3">
              {s.points.map((b) => (
                <li key={b} className="flex gap-3 text-slate-700">
                  <span className="flex-shrink-0 mt-0.5" style={{ color: s.c }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">En détail</h2>
            <p className="text-slate-600 leading-relaxed">{s.d1}</p>
            <p className="text-slate-600 leading-relaxed">{s.d2}</p>
          </div>
        </div>
      </section>

      <section className="py-14 border-t border-slate-100" style={{ background: s.tint }}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Comment ça marche</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {s.etapes.map((e, i) => (
              <div key={e.t} className="bg-white rounded-2xl p-6 border border-slate-200">
                <div className="text-sm font-bold mb-2" style={{ color: s.txt }}>{"0" + (i + 1)}</div>
                <div className="font-bold text-slate-900 mb-2">{e.t}</div>
                <div className="text-sm text-slate-600 leading-relaxed">{e.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">Envie de le voir sur votre projet ?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tarifs" className="inline-flex items-center justify-center bg-slate-900 text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-slate-800 transition-colors">Voir les tarifs</Link>
            <Link href="/solutions" className="inline-flex items-center justify-center border border-slate-300 text-slate-700 px-8 py-4 rounded-lg text-base font-semibold hover:bg-slate-50 transition-colors">Toutes les solutions</Link>
          </div>
        </div>
      </section>
    </>
  );
}
