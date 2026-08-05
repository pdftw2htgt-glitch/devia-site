import Link from "next/link";

export const metadata = {
  title: "Solutions - DEVIA",
  description: "Charpente traditionnelle, industrielle, construction bois, extension, multi-structure : DEVIA apporte une solution de chiffrage a chaque type de projet.",
};

const solutions = [
  {
    id: "charpente-traditionnelle", eyebrow: "Charpente traditionnelle",
    title: "La tradition, recreee par l'IA",
    desc: "DEVIA genere vos charpentes traditionnelles a partir de vos instructions : fermes completes, pannes d'aplomb, chevrons calepines. Prete a montrer au client, prete a exporter.",
    bullets: ["Fermes completes avec liens de faitage", "Pieces verifiees en flexion et au flambement", "Sections d'usage regional pour le rendu"],
    c: "#f59e0b", txt: "#b45309",
  },
  {
    id: "charpente-industrielle", eyebrow: "Charpente industrielle",
    title: "La fermette, chiffree en serie",
    desc: "Decrivez la toiture, DEVIA genere la serie de fermettes, la compte et la chiffre avec vos prix.",
    bullets: ["Serie a entraxe regulier", "Metre et quantites automatiques", "Devis immediat, pret a envoyer"],
    c: "#3b82f6", txt: "#1d4ed8",
  },
  {
    id: "construction-bois", eyebrow: "Construction bois",
    title: "L'ossature bois, murs compris",
    desc: "DEVIA leve vos murs a ossature bois et pose la charpente dessus, dans la meme scene 3D.",
    bullets: ["MOB 45x145 avec baies renforcees", "Voile OSB et planchers geres", "Nomenclature murs + toiture"],
    c: "#8b5cf6", txt: "#6d28d9",
  },
  {
    id: "charpente-couverture", eyebrow: "Charpente couverture",
    title: "La couverture, posee sur le calcul",
    desc: "Tuiles ou bac acier : DEVIA pese la couverture dans le calcul des sections, et compte liteaux et surfaces avec le reste.",
    bullets: ["Poids reel dans la descente de charges", "Liteaux calepines automatiquement", "Surfaces pretes pour la commande"],
    c: "#10b981", txt: "#047857",
  },
  {
    id: "extension", eyebrow: "Extension",
    title: "Agrandir sans tout refaire",
    desc: "DEVIA accroche l'ouvrage neuf a l'existant : appentis, balcon, garage — chacun a sa place, avec ses pieces de liaison.",
    bullets: ["Ancrage automatique sur le batiment", "Consoles calculees, muraillere sur la face du mur", "Un devis par ouvrage ajoute"],
    c: "#f43f5e", txt: "#be123c",
  },
  {
    id: "multi-structure", eyebrow: "Multi-structure",
    title: "Plusieurs ouvrages, un seul devis",
    desc: "Maison, balcon, hangar : DEVIA calcule chaque ouvrage pour lui-meme, puis fusionne le tout en un seul devis assemble en 3D.",
    bullets: ["Calculs individuels par ouvrage", "Assemblage 3D automatique", "Sous-totaux par ouvrage"],
    c: "#14b8a6", txt: "#0f766e",
  },
  {
    id: "neuf-renovation", eyebrow: "Neuf & renovation",
    title: "Du neuf a la reprise d'existant",
    desc: "DEVIA chiffre le neuf de bout en bout, lit les plans de l'existant, et prepare le module renovation.",
    bullets: ["Neuf : de la description au devis", "Plans de l'existant importes", "Reprise d'existant en developpement"],
    c: "#6366f1", txt: "#4338ca",
  },
  {
    id: "etude-calcul", eyebrow: "Etude & calcul de structure",
    title: "L'Eurocode 5, sans bureau d'etudes",
    desc: "DEVIA verifie chaque piece selon l'Eurocode 5, avec les charges reelles de neige et de vent de votre commune.",
    bullets: ["Flexion, fleche, compression, flambement", "Charges climatiques par commune", "Hypotheses affichees et defendables"],
    c: "#f97316", txt: "#c2410c",
  },
  {
    id: "logistique", eyebrow: "Logistique",
    title: "Le metre qui prepare le chantier",
    desc: "DEVIA sort la nomenclature complete du projet : de quoi preparer le debit et la commande scierie des le devis.",
    bullets: ["Nomenclature piece par piece", "Volumes et poids totaux", "Assemblages recommandes"],
    c: "#06b6d4", txt: "#0e7490",
  },
  {
    id: "export-ifc", eyebrow: "Export IFC",
    title: "Compatible avec vos outils",
    desc: "DEVIA exporte la structure en IFC, le standard ouvert du batiment : votre projet vous suit dans vos logiciels habituels.",
    bullets: ["Export en un clic depuis la 3D", "Geometrie et placements conserves", "Lisible partout, sans ressaisie"],
    c: "#84cc16", txt: "#4d7c0f",
  },
  {
    id: "conception-chiffrage", eyebrow: "Conception & chiffrage",
    title: "Du plan au devis signe",
    desc: "Du mail du client au devis signe : DEVIA concoit, verifie et chiffre dans le meme outil.",
    bullets: ["Plan, photo ou description en entree", "3D et calculs integres", "PDF final avec vues et prix"],
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
          <p className="text-xl text-slate-300 mb-10">Decrivez-le a DEVIA et jugez le resultat par vous-meme.</p>
          <Link href="/tarifs" className="inline-flex items-center bg-amber-500 text-slate-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-amber-400 transition-colors">
            Voir les tarifs
          </Link>
        </div>
      </section>
    </>
  );
}
