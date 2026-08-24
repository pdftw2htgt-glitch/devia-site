import Link from "next/link";

export const metadata = {
  title: "Solutions - DEVIA",
  description: "Charpente traditionnelle, industrielle, construction bois, extension, multi-structure : DEVIA apporte une solution de chiffrage a chaque type de projet.",
};

const solutions = [
  {
    id: "charpente-traditionnelle", eyebrow: "Charpente traditionnelle",
    title: "La tradition, recréée par l'IA",
    desc: "DEVIA génère vos charpentes traditionnelles à partir de vos instructions : fermes complètes, pannes d'aplomb, chevrons calepinés. Prête à montrer au client, prête à exporter.",
    bullets: ["Fermes complètes avec liens de faîtage", "Pièces vérifiées en flexion et au flambement", "Sections d'usage régional pour le rendu"],
    c: "#f59e0b", txt: "#b45309",
  },
  {
    id: "charpente-industrielle", eyebrow: "Charpente industrielle",
    title: "La fermette, chiffrée en série",
    desc: "Décrivez la toiture, DEVIA génère la série de fermettes, la compte et la chiffre avec vos prix.",
    bullets: ["Série à entraxe régulier", "Métré et quantités automatiques", "Devis immédiat, prêt à envoyer"],
    c: "#3b82f6", txt: "#1d4ed8",
  },
  {
    id: "construction-bois", eyebrow: "Construction bois",
    title: "L'ossature bois, murs compris",
    desc: "DEVIA maîtrise la construction bois : murs à ossature, caissons de toiture, charpente - chaque pièce, chaque règle d'or.",
    bullets: ["MOB : montants, lisses basse, haute, d'ancrage et de chaînage", "Baies avec montants doubles, linteaux et allèges", "Bardage extérieur, voile OSB et planchers"],
    c: "#8b5cf6", txt: "#6d28d9",
  },
  {
    id: "charpente-couverture", eyebrow: "Charpente couverture",
    title: "La couverture, posée sur le calcul",
    desc: "Tuiles ou bac acier : DEVIA pèse la couverture dans le calcul des sections, et compte liteaux et surfaces avec le reste.",
    bullets: ["Poids réel dans la descente de charges", "Liteaux calepinés automatiquement", "Surfaces prêtes pour la commande"],
    c: "#10b981", txt: "#047857",
  },
  {
    id: "extension", eyebrow: "Extension",
    title: "Agrandir sans tout refaire",
    desc: "DEVIA accroche l'ouvrage neuf à l'existant : appentis, balcon, garage — chacun à sa place, avec ses pièces de liaison.",
    bullets: ["Ancrage automatique sur le bâtiment", "Consoles calculées, muraillère sur la face du mur", "Un devis par ouvrage ajouté"],
    c: "#f43f5e", txt: "#be123c",
  },
  {
    id: "multi-structure", eyebrow: "Multi-structure",
    title: "Plusieurs ouvrages, un seul devis",
    desc: "Maison, balcon, hangar : DEVIA calcule chaque ouvrage pour lui-même, puis fusionne le tout en un seul devis assemblé en 3D.",
    bullets: ["Calculs individuels par ouvrage", "Assemblage 3D automatique", "Sous-totaux par ouvrage"],
    c: "#14b8a6", txt: "#0f766e",
  },
  {
    id: "neuf-renovation", eyebrow: "Neuf & rénovation",
    title: "Du neuf à la reprise d'existant",
    desc: "DEVIA chiffre le neuf de bout en bout, lit les plans de l'existant, et prépare le module rénovation.",
    bullets: ["Neuf : de la description au devis", "Plans de l'existant importés", "Reprise d'existant en développement"],
    c: "#6366f1", txt: "#4338ca",
  },
  {
    id: "etude-calcul", eyebrow: "Étude & calcul de structure",
    title: "L'Eurocode 5, sans bureau d'études",
    desc: "DEVIA vérifie chaque pièce selon l'Eurocode 5, avec les charges réelles de neige et de vent de votre commune.",
    bullets: ["Flexion, flèche, compression, flambement", "Charges climatiques par commune", "Hypothèses affichées et défendables"],
    c: "#f97316", txt: "#c2410c",
  },
  {
    id: "logistique", eyebrow: "Logistique",
    title: "Le métré qui prépare le chantier",
    desc: "DEVIA sort la nomenclature complète du projet : de quoi préparer le débit et la commande scierie dès le devis.",
    bullets: ["Nomenclature pièce par pièce", "Volumes et poids totaux", "Assemblages recommandés"],
    c: "#06b6d4", txt: "#0e7490",
  },
  {
    id: "export-ifc", eyebrow: "Export IFC",
    title: "Compatible avec vos outils",
    desc: "DEVIA exporte la structure en IFC, le standard ouvert du bâtiment : votre projet vous suit dans vos logiciels habituels.",
    bullets: ["Export en un clic depuis la 3D", "Géométrie et placements conservés", "Lisible partout, sans ressaisie"],
    c: "#84cc16", txt: "#4d7c0f",
  },
  {
    id: "conception-chiffrage", eyebrow: "Conception & chiffrage",
    title: "Du plan au devis signé",
    desc: "Du mail du client au devis signé : DEVIA conçoit, vérifie et chiffre dans le même outil.",
    bullets: ["Plan, photo ou description en entrée", "3D et calculs intégrés", "PDF final avec vues et prix"],
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
              Du carport au hangar agricole, de l'étude de structure à la logistique :
              DEVIA connaît la géométrie, les règles et les pièces de chaque type de projet bois.
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
            <Link href={"/solutions/" + s.id} className="inline-flex items-center gap-1 mt-6 text-sm font-semibold hover:underline" style={{ color: s.txt }}>
              En savoir plus
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </section>
      ))}

      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-6">Votre projet est dans la liste ?</h2>
          <p className="text-xl text-slate-300 mb-10">Décrivez-le à DEVIA et jugez le résultat par vous-même.</p>
          <Link href="/tarifs" className="inline-flex items-center bg-amber-500 text-slate-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-amber-400 transition-colors">
            Voir les tarifs
          </Link>
        </div>
      </section>
    </>
  );
}
