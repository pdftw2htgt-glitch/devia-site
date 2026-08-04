import Link from "next/link";

export const metadata = {
  title: "Solutions - DEVIA",
  description: "Charpente traditionnelle, industrielle, construction bois, extension, multi-structure : DEVIA apporte une solution de chiffrage a chaque type de projet.",
};

const solutions = [
  {
    id: "charpente-traditionnelle", eyebrow: "Charpente traditionnelle",
    title: "La tradition, calculee au millimetre",
    desc: "Fermes completes, pannes d'aplomb sur echantignoles, coupes d'onglet au faitage : DEVIA modelise la charpente traditionnelle avec le niveau de detail d'un atelier. Chaque piece est dimensionnee selon l'Eurocode 5, jusqu'aux sections regionales de montagne.",
    bullets: ["Fermes, pannes, chevrons, liens de faitage", "Sections mini et conseillees par piece", "Table regionale montagne integree"],
    c: "#f59e0b", txt: "#b45309",
  },
  {
    id: "charpente-industrielle", eyebrow: "Charpente industrielle",
    title: "La fermette, chiffree en serie",
    desc: "Pour les toitures economiques et les grandes series, DEVIA chiffre les charpentes industrielles a fermettes : entraxes reguliers, quantites optimisees, devis immediat.",
    bullets: ["Type fermette dedie au formulaire", "Quantites et entraxes automatiques", "Devis immediat, pret a envoyer"],
    c: "#3b82f6", txt: "#1d4ed8",
  },
  {
    id: "construction-bois", eyebrow: "Construction bois",
    title: "L'ossature bois, murs compris",
    desc: "Murs a ossature bois 45x145 avec montants doubles aux baies, linteaux, alleges et voile OSB : DEVIA ne s'arrete pas au toit. La structure complete, du mur a la couverture.",
    bullets: ["MOB 45x145 avec baies et linteaux", "Voile travaillant OSB", "Planchers et niveaux geres"],
    c: "#8b5cf6", txt: "#6d28d9",
  },
  {
    id: "charpente-couverture", eyebrow: "Charpente couverture",
    title: "La couverture, posee sur le calcul",
    desc: "Tuiles ou bac acier : la couverture choisie pese sur la structure, et DEVIA en tient compte dans la descente de charge. Liteaux, calepinage et surfaces sont chiffres avec le reste.",
    bullets: ["Poids de couverture integre au calcul", "Liteaux et calepinage automatiques", "Surfaces et quantites au metre"],
    c: "#10b981", txt: "#047857",
  },
  {
    id: "extension", eyebrow: "Extension",
    title: "Agrandir sans tout refaire",
    desc: "Appentis adosses, balcons ancres en facade, garages accoles : DEVIA sait accrocher un ouvrage neuf a un batiment existant, muraillere posee sur la face du mur et devis dedie.",
    bullets: ["Appentis, balcons et garages ancres", "Ancrage automatique sur l'existant", "Un devis par ouvrage ajoute"],
    c: "#f43f5e", txt: "#be123c",
  },
  {
    id: "multi-structure", eyebrow: "Multi-structure",
    title: "Plusieurs ouvrages, un seul devis",
    desc: "Une maison, son balcon et son hangar dans le meme projet : chaque structure est calculee individuellement, assemblee en 3D sur la meme scene, et fusionnee dans un devis unique.",
    bullets: ["Generation individuelle par ouvrage", "Assemblage 3D automatique", "Devis fusionne, sous-totaux par ouvrage"],
    c: "#14b8a6", txt: "#0f766e",
  },
  {
    id: "neuf-renovation", eyebrow: "Neuf & renovation",
    title: "Du projet neuf a la reprise d'existant",
    desc: "DEVIA chiffre le neuf de bout en bout des aujourd'hui. Pour la renovation, l'import de plans et l'ancrage sur existant preparent le terrain — le module reprise d'existant est en developpement.",
    bullets: ["Projets neufs chiffres de bout en bout", "Import de plans de l'existant", "Module renovation en developpement"],
    c: "#6366f1", txt: "#4338ca",
  },
  {
    id: "etude-calcul", eyebrow: "Etude & calcul de structure",
    title: "L'Eurocode 5, sans bureau d'etudes",
    desc: "Flexion, fleche, compression, flambement : chaque piece est verifiee selon l'Eurocode 5 avec les charges de neige et de vent de la commune. Sections mini et conseillees, hypotheses affichees.",
    bullets: ["Verifications flexion et flambement", "Neige et vent par commune, altitude comprise", "Hypotheses transparentes et defendables"],
    c: "#f97316", txt: "#c2410c",
  },
  {
    id: "logistique", eyebrow: "Logistique",
    title: "Le metre qui prepare le chantier",
    desc: "Nomenclature complete des pieces, sections, longueurs, volumes et poids : le metre detaille de DEVIA prepare le debit, la commande scierie et le transport.",
    bullets: ["Nomenclature piece par piece", "Volumes et poids totaux", "Base ideale pour le debit et la commande"],
    c: "#06b6d4", txt: "#0e7490",
  },
  {
    id: "export-ifc", eyebrow: "Export IFC",
    title: "Compatible avec vos outils",
    desc: "Exportez la structure au format IFC et retrouvez-la dans vos logiciels de conception et de calcul habituels. DEVIA s'integre a votre chaine d'outils, il ne vous enferme pas.",
    bullets: ["Export IFC en un clic", "Geometrie et placements conserves", "Lisible par vos logiciels habituels"],
    c: "#84cc16", txt: "#4d7c0f",
  },
  {
    id: "conception-chiffrage", eyebrow: "Conception & chiffrage",
    title: "Du plan au devis signe",
    desc: "Deposez un plan ou decrivez le projet, ajustez la 3D, validez les sections, envoyez le PDF : DEVIA couvre toute la chaine, de la conception au chiffrage.",
    bullets: ["Import de plan et description libre", "3D et calculs dans le meme outil", "Devis PDF pret pour le client"],
    c: "#a855f7", txt: "#7e22ce",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Une solution pour
              <br />
              <span className="text-amber-600">chaque projet.</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Du carport au hangar agricole, de l'etude de structure a la logistique :
              DEVIA connait la geometrie, les regles et les pieces de chaque type de projet bois.
            </p>
          </div>
        </div>
      </section>

      {solutions.map((s, i) => (
        <section key={s.id} id={s.id} className={"py-16 border-t border-slate-100 scroll-mt-24 " + (i % 2 === 1 ? "bg-slate-50" : "bg-white")}>
          <div className="max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide mb-4" style={{ color: s.txt }}>
              <span className="w-2 h-2 rounded-full" style={{ background: s.c }} />
              {s.eyebrow}
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">{s.title}</h2>
            <p className="text-slate-600 leading-relaxed mb-6">{s.desc}</p>
            <ul className="space-y-3">
              {s.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-slate-700">
                  <span className="flex-shrink-0 mt-0.5" style={{ color: s.c }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-6">Votre projet est dans la liste ?</h2>
          <p className="text-xl text-slate-300 mb-10">Decrivez-le a DEVIA et jugez le resultat par vous-meme.</p>
          <Link href="/tarifs" className="inline-flex items-center bg-amber-500 text-slate-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-amber-400 transition-colors">
            Voir les tarifs
          </Link>
        </div>
      </section>
    </>
  );
}
