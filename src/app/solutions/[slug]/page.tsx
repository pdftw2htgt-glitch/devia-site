import Link from "next/link";
import { notFound } from "next/navigation";

const solutions = [
  {
    slug: "charpente-traditionnelle", eyebrow: "Charpente traditionnelle",
    title: "La charpente traditionnelle, calculee au millimetre",
    intro: "Fermes completes, pannes d'aplomb sur echantignoles, coupes d'onglet au faitage : DEVIA modelise la charpente traditionnelle avec le niveau de detail d'un atelier.",
    points: ["Fermes completes : entraits, arbaletriers, poincons, contrefiches", "Pannes d'aplomb calees sur echantignoles", "Coupes d'onglet au faitage, liens de faitage", "Sections mini et conseillees selon Eurocode 5", "Table regionale montagne integree au calcul"],
    d1: "Chaque ferme est generee avec ses pieces reelles et leurs assemblages types. Les pannes se posent d'aplomb sur leurs echantignoles, les chevrons se calepinent par travee, et la couverture choisie pese sur la structure dans la descente de charge.",
    d2: "En montagne, DEVIA connait les habitudes locales : si l'altitude l'exige, la section conseillee bascule sur la table regionale, testee et validee par le calcul. Le devis, la 3D et le tableau de verification racontent la meme chose.",
    etapes: [{ t: "Decrivez", d: "Dimensions, pente, commune : quelques mots suffisent." }, { t: "Verifiez", d: "La 3D et les sections calculees s'affichent immediatement." }, { t: "Envoyez", d: "Le devis PDF part chez votre client avec ses vues 3D." }],
    c: "#f59e0b", txt: "#b45309", tint: "#fffbeb",
  },
  {
    slug: "charpente-industrielle", eyebrow: "Charpente industrielle",
    title: "La fermette industrielle, chiffree en serie",
    intro: "Pour les toitures economiques et les grandes series, DEVIA chiffre les charpentes a fermettes avec des entraxes reguliers et des quantites optimisees.",
    points: ["Type fermette dedie au formulaire", "Entraxes et quantites automatiques", "Chiffrage immediat de la serie", "Couverture et liteaunage integres", "Devis pret a envoyer"],
    d1: "La charpente industrielle vit de la repetition : DEVIA genere la serie de fermettes, compte les pieces et applique vos prix pour un chiffrage immediat.",
    d2: "Le calcul des quantites est deterministe : memes entrees, memes sorties. Vous ajustez l'entraxe ou la portee, tout se recalcule.",
    etapes: [{ t: "Decrivez", d: "Portee, longueur, pente de la toiture." }, { t: "Verifiez", d: "La serie de fermettes et ses quantites s'affichent." }, { t: "Envoyez", d: "Le devis complet part en quelques minutes." }],
    c: "#3b82f6", txt: "#1d4ed8", tint: "#eff6ff",
  },
  {
    slug: "construction-bois", eyebrow: "Construction bois",
    title: "L'ossature bois, du mur a la couverture",
    intro: "Murs a ossature bois 45x145, montants doubles aux baies, linteaux, alleges, voile OSB : DEVIA structure le batiment complet, pas seulement son toit.",
    points: ["MOB 45x145 avec baies, linteaux et alleges", "Voile travaillant OSB", "Planchers et niveaux geres", "Charpente posee sur l'ossature", "Metre complet murs + toit"],
    d1: "Les murs a ossature bois sont generes avec leurs montants, lisses et entretoises, et les baies recoivent leurs montants doubles, linteaux et alleges automatiquement.",
    d2: "La charpente vient se poser sur l'ossature dans la meme scene 3D, et le metre reunit murs et toiture dans une seule nomenclature chiffree.",
    etapes: [{ t: "Decrivez", d: "Emprise, hauteur, nombre de niveaux, ouvertures." }, { t: "Verifiez", d: "Ossature et charpente s'assemblent en 3D." }, { t: "Envoyez", d: "Le devis couvre la structure complete." }],
    c: "#8b5cf6", txt: "#6d28d9", tint: "#f5f3ff",
  },
  {
    slug: "charpente-couverture", eyebrow: "Charpente couverture",
    title: "La couverture, posee sur le calcul",
    intro: "Tuiles ou bac acier : la couverture choisie pese sur la structure, et DEVIA en tient compte dans la descente de charge comme dans le chiffrage.",
    points: ["Poids de couverture integre au calcul des sections", "Liteaux et calepinage automatiques", "Surfaces et quantites au metre", "Ecran et accessoires chiffrables au devis", "Rendu realiste par type de couverture"],
    d1: "Changer de couverture change la structure : DEVIA repercute le poids du materiau dans la descente de charge, et les sections suivent.",
    d2: "Le calepinage des liteaux et les surfaces de couverture sont comptes automatiquement, prets pour la commande.",
    etapes: [{ t: "Choisissez", d: "Le type de couverture dans le formulaire." }, { t: "Verifiez", d: "Sections et quantites s'adaptent en direct." }, { t: "Envoyez", d: "Le devis integre structure et couverture." }],
    c: "#10b981", txt: "#047857", tint: "#ecfdf5",
  },
  {
    slug: "extension", eyebrow: "Extension",
    title: "Agrandir sans tout refaire",
    intro: "Appentis adosses, balcons ancres en facade, garages accoles : DEVIA accroche un ouvrage neuf a un batiment existant, proprement.",
    points: ["Appentis ancres au mur, muraillere sur la face", "Balcons en porte-a-faux avec consoles calculees", "Garages et monopentes accoles au pignon", "Porche automatique au-dessus de la porte", "Un devis dedie par ouvrage ajoute"],
    d1: "L'ancrage est automatique : l'appentis vient se plaquer contre le gouttereau, le balcon s'accroche en facade avec sa porte-fenetre, le garage s'adosse au pignon. Chaque ouvrage connait sa place.",
    d2: "Les pieces d'ancrage sont posees comme sur un vrai chantier : muraillere sur la face du mur, consoles dimensionnees en compression et flambement.",
    etapes: [{ t: "Decrivez", d: "Le batiment principal et l'ouvrage a ajouter." }, { t: "Verifiez", d: "L'assemblage s'affiche en 3D, deja positionne." }, { t: "Envoyez", d: "Le devis distingue chaque ouvrage." }],
    c: "#f43f5e", txt: "#be123c", tint: "#fff1f2",
  },
  {
    slug: "multi-structure", eyebrow: "Multi-structure",
    title: "Plusieurs ouvrages, un seul devis",
    intro: "Une maison, son balcon et son hangar dans le meme projet : chaque structure est calculee individuellement puis reunie dans un devis unique.",
    points: ["Generation individuelle par ouvrage", "Assemblage 3D automatique sur une scene", "Devis fusionne avec sous-totaux par ouvrage", "PDF par sections avec vues 3D assemblees", "Sections calculees pour chaque structure"],
    d1: "Chaque ouvrage du projet est genere et calcule pour lui-meme : ses charges, ses sections, son metre. Rien n'est mutualise a l'aveugle.",
    d2: "La fusion est deterministe : les postes de chaque ouvrage sont regroupes et titres, les totaux s'additionnent, et le PDF presente le projet complet, vues 3D assemblees comprises.",
    etapes: [{ t: "Composez", d: "Ajoutez les structures une a une au projet." }, { t: "Verifiez", d: "La scene 3D assemble tout, chaque calcul reste propre." }, { t: "Envoyez", d: "Un seul devis, lisible ouvrage par ouvrage." }],
    c: "#14b8a6", txt: "#0f766e", tint: "#f0fdfa",
  },
  {
    slug: "neuf-renovation", eyebrow: "Neuf & renovation",
    title: "Du projet neuf a la reprise d'existant",
    intro: "DEVIA chiffre le neuf de bout en bout des aujourd'hui. Pour la renovation, l'import de plans et l'ancrage sur existant preparent le terrain.",
    points: ["Projets neufs chiffres de bout en bout", "Import de plans PDF et photos de l'existant", "Extensions ancrees sur batiments existants", "Module reprise d'existant en developpement"],
    d1: "Sur le neuf, tout y est : de la description au devis signe, en passant par la 3D et les verifications de structure.",
    d2: "Pour la renovation, DEVIA lit deja les plans de l'existant et sait y accrocher des ouvrages neufs. Le module complet de reprise d'existant est en developpement — il sera annonce sur la page Actualite.",
    etapes: [{ t: "Importez", d: "Le plan de l'existant ou la description du neuf." }, { t: "Verifiez", d: "DEVIA pre-remplit et modelise." }, { t: "Envoyez", d: "Le devis part, neuf ou extension." }],
    c: "#6366f1", txt: "#4338ca", tint: "#eef2ff",
  },
  {
    slug: "etude-calcul", eyebrow: "Etude & calcul de structure",
    title: "L'Eurocode 5, sans bureau d'etudes",
    intro: "Flexion, fleche, compression, flambement : chaque piece est verifiee selon l'Eurocode 5 avec les charges reelles de la commune.",
    points: ["Verification en flexion et en fleche", "Compression et flambement des pieces comprimees", "Neige et vent par commune, altitude comprise", "Sections mini et conseillees affichees", "Hypotheses transparentes, valeurs a valider par un professionnel"],
    d1: "Le moteur de calcul est unique : le devis, la 3D et le tableau de verification lisent exactement les memes sections. Pas de double discours entre ce qui est dessine et ce qui est chiffre.",
    d2: "Les charges viennent du reel : zone de neige et de vent selon la commune, correction d'altitude, poids de la couverture choisie, panneaux solaires si le projet en porte.",
    etapes: [{ t: "Localisez", d: "La commune suffit : charges climatiques recuperees." }, { t: "Verifiez", d: "Le tableau affiche mini, conseillee et hypotheses." }, { t: "Defendez", d: "Des valeurs tracables face a un bureau d'etudes." }],
    c: "#f97316", txt: "#c2410c", tint: "#fff7ed",
  },
  {
    slug: "logistique", eyebrow: "Logistique",
    title: "Le metre qui prepare le chantier",
    intro: "Nomenclature complete des pieces, sections, longueurs, volumes et poids : le metre detaille prepare le debit, la commande scierie et le transport.",
    points: ["Nomenclature piece par piece", "Sections, longueurs unitaires et totales", "Volumes et poids par essence", "Base ideale pour le debit et la commande", "Assemblages recommandes par type de piece"],
    d1: "Chaque piece dessinee en 3D est comptee au metre : rien n'apparait dans la nomenclature qui ne soit dans la structure, et inversement.",
    d2: "Volumes et poids totaux donnent l'ordre de grandeur du transport et du levage, et la liste des assemblages recommandes prepare l'atelier.",
    etapes: [{ t: "Generez", d: "Le projet produit son metre automatiquement." }, { t: "Verifiez", d: "Nomenclature, volumes, poids : tout est la." }, { t: "Commandez", d: "La liste part chez votre scieur." }],
    c: "#06b6d4", txt: "#0e7490", tint: "#ecfeff",
  },
  {
    slug: "export-ifc", eyebrow: "Export IFC",
    title: "Compatible avec vos outils",
    intro: "Exportez la structure au format IFC et retrouvez-la dans vos logiciels de conception et de calcul habituels.",
    points: ["Export IFC en un clic depuis la 3D", "Geometrie et placements conserves", "Pieces identifiees par type", "Lisible par vos logiciels habituels", "Votre travail reste portable"],
    d1: "DEVIA s'integre a votre chaine d'outils, il ne vous enferme pas : la structure generee s'exporte au format IFC, le standard ouvert du batiment.",
    d2: "Chaque piece part avec sa geometrie, son placement et son identite — de quoi poursuivre la conception ou l'execution dans l'outil de votre choix.",
    etapes: [{ t: "Generez", d: "Votre structure dans DEVIA." }, { t: "Exportez", d: "Un clic, un fichier IFC." }, { t: "Poursuivez", d: "Dans votre logiciel habituel." }],
    c: "#84cc16", txt: "#4d7c0f", tint: "#f7fee7",
  },
  {
    slug: "conception-chiffrage", eyebrow: "Conception & chiffrage",
    title: "Du plan au devis signe",
    intro: "Deposez un plan ou decrivez le projet, ajustez la 3D, validez les sections, envoyez le PDF : DEVIA couvre toute la chaine.",
    points: ["Import de plan et description libre", "Pre-remplissage automatique du projet", "3D et calculs dans le meme outil", "Vos prix appliques via le catalogue", "Devis PDF pret pour le client"],
    d1: "La conception et le chiffrage ne sont plus deux mondes : la meme description produit la structure 3D, les verifications et le devis chiffre.",
    d2: "Avec votre catalogue renseigne, les prix sont les votres. Le PDF final reunit le chiffrage et les vues du projet — votre client voit ce qu'il signe.",
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
