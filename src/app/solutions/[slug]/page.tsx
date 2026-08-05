import Link from "next/link";
import { notFound } from "next/navigation";

const solutions = [
  {
    slug: "charpente-traditionnelle", eyebrow: "Charpente traditionnelle",
    title: "La charpente traditionnelle, recreee par l'IA",
    intro: "DEVIA reconstruit toutes vos charpentes traditionnelles grace a l'IA et aux instructions que vous lui donnez. En s'appuyant sur les normes de construction en vigueur, ou sur vos propres specificites, elle recree une charpente prete a etre presentee au client puis exportee.",
    points: ["Fermes completes et realistes : entrait, arbaletriers, poincon, contrefiches et liens de faitage", "Chaque piece verifiee : flexion, fleche, compression et flambement", "Ajustement des sections d'usage selon la region, pour un rendu plus esthetique"],
    d1: "La structure est generee piece par piece avec ses regles de metier : fermes a entraxe regulier, pannes d'aplomb calees sur leurs echantignoles, chevrons repartis par travee. Le resultat se lit comme un plan d'execution, pas comme un dessin d'illustration.",
    d2: "Chaque type de piece recoit sa verification Eurocode 5 avec les charges de neige et de vent de votre commune, altitude comprise. En zone de montagne, les sections d'usage regional passent en tete des qu'elles tiennent le calcul.",
    etapes: [{ t: "Decrivez", d: "Type, dimensions, pente, commune - ou collez le mail du client." }, { t: "Verifiez", d: "3D complete et tableau Eurocode 5 en quelques secondes." }, { t: "Envoyez", d: "Devis PDF avec vues 3D, nomenclature et prix." }],
    c: "#f59e0b", txt: "#b45309", tint: "#fffbeb",
  },
  {
    slug: "charpente-industrielle", eyebrow: "Charpente industrielle",
    title: "La fermette, chiffree en serie",
    intro: "DEVIA chiffre vos charpentes industrielles a fermettes a partir d'une simple description. Elle calcule la serie, compte les pieces et applique vos prix : le devis de la toiture economique, sans y passer l'apres-midi.",
    points: ["Serie de fermettes generee a entraxe regulier", "Quantites et metre calcules automatiquement", "Vos prix appliques via votre catalogue"],
    d1: "La charpente industrielle vit de la repetition : DEVIA genere la serie, la compte et la chiffre d'un seul geste. Vous ajustez la portee ou l'entraxe, tout se recalcule.",
    d2: "Le calcul est deterministe : memes entrees, memes sorties. Un devis de fermettes reste comparable d'un projet a l'autre, et defendable devant le client.",
    etapes: [{ t: "Decrivez", d: "Portee, longueur, pente de la toiture." }, { t: "Verifiez", d: "La serie et ses quantites s'affichent." }, { t: "Envoyez", d: "Le devis complet part en quelques minutes." }],
    c: "#3b82f6", txt: "#1d4ed8", tint: "#eff6ff",
  },
  {
    slug: "construction-bois", eyebrow: "Construction bois",
    title: "L'ossature bois, murs compris",
    intro: "DEVIA construit vos murs a ossature bois et leur charpente dans le meme projet. Montants 45x145, baies avec montants doubles, linteaux et alleges, voile OSB : la structure complete, prete a presenter.",
    points: ["MOB 45x145 : montants, lisses et entretoises generes", "Baies avec montants doubles, linteaux et alleges", "Voile travaillant OSB et planchers geres"],
    d1: "Vous decrivez le batiment, DEVIA leve les murs : chaque baie recoit ses renforts automatiquement, et la charpente vient se poser sur l'ossature dans la meme scene 3D.",
    d2: "Le metre reunit murs et toiture dans une seule nomenclature chiffree : sections, longueurs, volumes et poids, prets pour le debit.",
    etapes: [{ t: "Decrivez", d: "Emprise, hauteur, niveaux, ouvertures." }, { t: "Verifiez", d: "Ossature et charpente s'assemblent en 3D." }, { t: "Envoyez", d: "Le devis couvre la structure complete." }],
    c: "#8b5cf6", txt: "#6d28d9", tint: "#f5f3ff",
  },
  {
    slug: "charpente-couverture", eyebrow: "Charpente couverture",
    title: "La couverture, posee sur le calcul",
    intro: "DEVIA integre la couverture a votre chiffrage : tuiles ou bac acier, elle pese son poids reel dans le calcul des sections, et compte liteaux et surfaces avec le reste.",
    points: ["Poids de la couverture integre a la descente de charges", "Liteaux et calepinage comptes automatiquement", "Surfaces et quantites pretes pour la commande"],
    d1: "Changer de couverture change la structure : DEVIA repercute le poids du materiau choisi dans le calcul, et les sections suivent.",
    d2: "Le rendu 3D realiste affiche la couverture choisie, et le devis detaille surfaces et quantites pour la commande.",
    etapes: [{ t: "Choisissez", d: "Le type de couverture dans le formulaire." }, { t: "Verifiez", d: "Sections et quantites s'adaptent en direct." }, { t: "Envoyez", d: "Le devis integre structure et couverture." }],
    c: "#10b981", txt: "#047857", tint: "#ecfdf5",
  },
  {
    slug: "extension", eyebrow: "Extension",
    title: "Agrandir sans tout refaire",
    intro: "DEVIA accroche vos extensions a l'existant : appentis contre le gouttereau, balcon en facade avec sa porte-fenetre, garage accole au pignon. Elle les positionne, les calcule et les chiffre comme sur un vrai chantier.",
    points: ["Appentis, balcons et garages ancres automatiquement", "Muraillere posee sur la face du mur, consoles calculees", "Un devis dedie pour chaque ouvrage ajoute"],
    d1: "L'ancrage est automatique et realiste : chaque ouvrage connait sa place, son orientation et ses pieces de liaison avec le batiment.",
    d2: "Les balcons recoivent leurs consoles dimensionnees en compression et flambement, et leur garde-corps conforme NF P01-012.",
    etapes: [{ t: "Decrivez", d: "Le batiment principal et l'ouvrage a ajouter." }, { t: "Verifiez", d: "L'assemblage s'affiche en 3D, deja positionne." }, { t: "Envoyez", d: "Le devis distingue chaque ouvrage." }],
    c: "#f43f5e", txt: "#be123c", tint: "#fff1f2",
  },
  {
    slug: "multi-structure", eyebrow: "Multi-structure",
    title: "Plusieurs ouvrages, un seul devis",
    intro: "DEVIA reunit plusieurs ouvrages dans un seul projet : la maison, son balcon, son hangar. Chaque structure est calculee pour elle-meme, puis tout est assemble en 3D et fusionne dans un devis unique.",
    points: ["Chaque ouvrage calcule individuellement", "Assemblage 3D automatique sur une seule scene", "Devis fusionne avec sous-totaux par ouvrage"],
    d1: "Rien n'est mutualise a l'aveugle : chaque ouvrage garde ses charges, ses sections et son metre.",
    d2: "Le PDF final presente le projet complet, vues 3D assemblees comprises. Votre client voit l'ensemble d'un coup d'oeil.",
    etapes: [{ t: "Composez", d: "Ajoutez les structures une a une au projet." }, { t: "Verifiez", d: "La scene 3D assemble tout, chaque calcul reste propre." }, { t: "Envoyez", d: "Un seul devis, lisible ouvrage par ouvrage." }],
    c: "#14b8a6", txt: "#0f766e", tint: "#f0fdfa",
  },
  {
    slug: "neuf-renovation", eyebrow: "Neuf & renovation",
    title: "Du projet neuf a la reprise d'existant",
    intro: "DEVIA chiffre vos projets neufs de bout en bout, et prepare deja la renovation : elle lit les plans de l'existant et sait y accrocher des ouvrages neufs.",
    points: ["Projets neufs chiffres de la description au devis", "Plans PDF et photos de l'existant importes", "Module reprise d'existant en developpement"],
    d1: "Sur le neuf, tout y est : description ou plan en entree, 3D, verifications Eurocode 5 et devis chiffre en sortie.",
    d2: "Pour la renovation, l'import de plans et l'ancrage sur existant sont deja la. Le module complet de reprise d'existant est en developpement - suivez la page Actualite.",
    etapes: [{ t: "Importez", d: "Le plan de l'existant ou la description du neuf." }, { t: "Verifiez", d: "DEVIA pre-remplit et modelise." }, { t: "Envoyez", d: "Le devis part, neuf ou extension." }],
    c: "#6366f1", txt: "#4338ca", tint: "#eef2ff",
  },
  {
    slug: "etude-calcul", eyebrow: "Etude & calcul de structure",
    title: "L'Eurocode 5, sans bureau d'etudes",
    intro: "DEVIA verifie votre structure selon l'Eurocode 5 : flexion, fleche, compression et flambement, avec les charges de neige et de vent de votre commune, altitude comprise.",
    points: ["Sections mini (calcul strict) et conseillees (usage metier)", "Charges climatiques recuperees par commune", "Hypotheses affichees, valeurs a valider par un professionnel"],
    d1: "Le moteur de calcul est unique : le devis, la 3D et le tableau de verification lisent exactement les memes sections. Pas de double discours entre ce qui est dessine et ce qui est chiffre.",
    d2: "Les hypotheses sont transparentes : portees, entraxes, combinaisons de charges. De quoi discuter d'egal a egal avec un bureau d'etudes.",
    etapes: [{ t: "Localisez", d: "La commune suffit : charges climatiques recuperees." }, { t: "Verifiez", d: "Le tableau affiche mini, conseillee et hypotheses." }, { t: "Defendez", d: "Des valeurs tracables face a un bureau d'etudes." }],
    c: "#f97316", txt: "#c2410c", tint: "#fff7ed",
  },
  {
    slug: "logistique", eyebrow: "Logistique",
    title: "Le metre qui prepare le chantier",
    intro: "DEVIA prepare votre chantier des le devis : nomenclature piece par piece, sections, longueurs, volumes et poids. Votre commande scierie est presque ecrite.",
    points: ["Nomenclature complete generee avec la 3D", "Volumes et poids totaux par projet", "Assemblages recommandes par type de piece"],
    d1: "Chaque piece dessinee est comptee : rien dans la nomenclature qui ne soit dans la structure, et inversement.",
    d2: "Volumes et poids donnent l'ordre de grandeur du transport et du levage des la phase de devis, et la liste des assemblages prepare l'atelier.",
    etapes: [{ t: "Generez", d: "Le projet produit son metre automatiquement." }, { t: "Verifiez", d: "Nomenclature, volumes, poids : tout est la." }, { t: "Commandez", d: "La liste part chez votre scieur." }],
    c: "#06b6d4", txt: "#0e7490", tint: "#ecfeff",
  },
  {
    slug: "export-ifc", eyebrow: "Export IFC",
    title: "Compatible avec vos outils",
    intro: "DEVIA exporte vos structures au format IFC, le standard ouvert du batiment : vous retrouvez votre projet dans vos logiciels habituels, geometrie et placements conserves.",
    points: ["Export IFC en un clic depuis la 3D", "Geometrie, placements et identites des pieces conserves", "Compatible avec vos logiciels de conception"],
    d1: "DEVIA s'integre a votre chaine d'outils, il ne vous enferme pas : le standard IFC est lisible partout.",
    d2: "Chaque piece part avec son placement exact - de quoi poursuivre la conception ou l'execution ailleurs, sans ressaisie.",
    etapes: [{ t: "Generez", d: "Votre structure dans DEVIA." }, { t: "Exportez", d: "Un clic, un fichier IFC." }, { t: "Poursuivez", d: "Dans votre logiciel habituel." }],
    c: "#84cc16", txt: "#4d7c0f", tint: "#f7fee7",
  },
  {
    slug: "conception-chiffrage", eyebrow: "Conception & chiffrage",
    title: "Du plan au devis signe",
    intro: "DEVIA couvre toute la chaine : vous deposez un plan ou decrivez le projet, elle concoit la structure, la verifie et la chiffre. Du premier mail du client au devis signe.",
    points: ["Plan, photo ou description libre en entree", "3D, calculs et devis dans le meme outil", "PDF final avec vues, nomenclature et prix"],
    d1: "La conception et le chiffrage ne sont plus deux mondes : la meme description produit la 3D, les verifications et le devis.",
    d2: "Avec votre catalogue renseigne, les prix sont les votres. Le PDF final reunit chiffrage et vues du projet : votre client voit ce qu'il signe.",
    etapes: [{ t: "Deposez", d: "Plan, photo ou simple description." }, { t: "Ajustez", d: "Dimensions, couverture, options du projet." }, { t: "Signez", d: "Le devis complet est chez le client." }],
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
            <h2 className="text-2xl font-bold text-slate-900 mb-5">En detail</h2>
            <p className="text-slate-600 leading-relaxed">{s.d1}</p>
            <p className="text-slate-600 leading-relaxed">{s.d2}</p>
          </div>
        </div>
      </section>

      <section className="py-14 border-t border-slate-100" style={{ background: s.tint }}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Comment ca marche</h2>
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
