import Link from "next/link";

const features = [
  {
    eyebrow: "Generation IA",
    title: "Un devis a partir d'une simple description",
    desc: "DEVIA peut creer un devis complet a partir d'une description simple pour les structures classiques. Elle peut analyser et utiliser des plans d'architecte pour des projets plus ambitieux. DEVIA comprend le langage naturel, analyse le type d'ouvrage, les dimensions et la commune, puis structure un devis complet.",
    bullets: ["Pre-remplit les infos depuis un plan PDF ou une photo", "Reflechit et cree en quelques secondes", "Detecte automatiquement le type d'ouvrage"],
    c: "#f59e0b", tint: "#fffbeb", txt: "#b45309",
    icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2z" /></svg>,
  },
  {
    eyebrow: "Visualisation 3D",
    title: "Votre charpente en 3D, prete a montrer",
    desc: "Chaque devis s'accompagne d'un modele 3D complet : sections calculees pour chaque piece, assemblages pre-definis et export IFC. Manipulez, zoomez, tournez autour de la structure. Vos clients comprennent enfin ce qu'ils achetent.",
    bullets: ["Modele 3D genere automatiquement", "Toutes les pieces detaillees et cotees", "Export IFC vers vos autres logiciels"],
    c: "#3b82f6", tint: "#eff6ff", txt: "#1d4ed8",
    icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.7l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.7l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><path d="M3.3 7L12 12l8.7-5M12 22V12" /></svg>,
  },
  {
    eyebrow: "Calculs Eurocode 5",
    title: "Des sections calculees, pas devinees",
    desc: "DEVIA dimensionne chaque piece selon l'Eurocode 5 : section mini (calcul strict) et section conseillee (usage metier et regional de montagne). Neige et vent recuperes selon la commune. Des devis solides, defendables.",
    bullets: ["Sections mini et conseillees pour chaque piece", "Charges neige et vent par commune", "Verification en flexion et au flambement"],
    c: "#8b5cf6", tint: "#f5f3ff", txt: "#6d28d9",
    icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M7 21h10M6 7l6-1 6 1" /><path d="M6 7l-3 6a3.5 3.5 0 006 0z" /><path d="M18 7l-3 6a3.5 3.5 0 006 0z" /></svg>,
  },
  {
    eyebrow: "Bilan carbone",
    title: "DEVIA agit pour la planete",
    desc: "Une requete DEVIA produit en moyenne 0,0317 kilogramme de CO2 et environ 0,16 litre d'eau. Une empreinte maitrisee et transparente, au service du materiau le plus bas carbone du batiment : le bois.",
    bullets: ["Vue sur votre empreinte carbone", "Valorise le bois, materiau bas carbone", "Un atout pour les marches publics"],
    c: "#10b981", tint: "#ecfdf5", txt: "#047857",
    icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" /><path d="M2 21c0-3 1.85-5.36 5.08-6" /></svg>,
  },
  {
    eyebrow: "Export PDF",
    title: "Un devis pro, pret a envoyer",
    desc: "Votre logo, vos coordonnees, le detail des postes avec leurs prix et les vues 3D de la charpente : DEVIA genere un devis PDF professionnel, chiffre et pret a envoyer. Et avec la formule personnalisee, le design du document s'adapte a l'image de votre entreprise.",
    bullets: ["Prix et postes detailles sur le document", "Vues 3D integrees au document", "Design personnalisable avec la formule personnalisee"],
    c: "#f43f5e", tint: "#fff1f2", txt: "#be123c",
    icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M9 15h6M9 11h2" /></svg>,
  },
  {
    eyebrow: "Catalogue d'entreprise",
    title: "Vos prix, votre marge, votre catalogue",
    desc: "Renseignez vos prix et vos materiaux une seule fois. DEVIA les applique automatiquement a tous vos devis, et complete au besoin avec les prix du marche. Vos tarifs restent les votres.",
    bullets: ["Vos prix appliques a tous vos devis", "Complement marche optionnel", "Catalogue de materiaux personnalise"],
    c: "#14b8a6", tint: "#f0fdfa", txt: "#0f766e",
    icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>,
  },
  {
    eyebrow: "Multi-projets",
    title: "Tous vos chantiers au meme endroit",
    desc: "Gerez l'ensemble de vos projets depuis une interface unique : historique, groupes, recherche instantanee. Retrouvez n'importe quel devis en un instant, meme des mois plus tard.",
    bullets: ["Tous vos projets au meme endroit", "Groupes et recherche instantanee", "Historique complet de vos devis"],
    c: "#6366f1", tint: "#eef2ff", txt: "#4338ca",
    icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>,
  },
];

export default function FeaturesPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.05]">
              Tous les outils dont vous avez besoin,
              <br />
              <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-blue-500 bg-clip-text text-transparent">dans un seul logiciel.</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              DEVIA remplace entierement votre processus de chiffrage. Chaque etape, du premier mail client au devis signe, dans un outil pense pour les charpentiers.
            </p>
          </div>
        </div>
      </section>

      {features.map((f, i) => {
        const reversed = i % 2 === 1;
        return (
          <section key={f.eyebrow} className="py-16 border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-14 items-center">
                <div className={reversed ? "md:order-2" : ""}>
                  <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide mb-4" style={{ color: f.txt }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: f.c }} />
                    {f.eyebrow}
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">{f.title}</h2>
                  <p className="text-slate-600 leading-relaxed mb-6">{f.desc}</p>
                  <ul className="space-y-3">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-slate-700">
                        <span className="flex-shrink-0 mt-0.5" style={{ color: f.c }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={reversed ? "md:order-1" : ""}>
                  <div className="rounded-3xl border border-slate-200 aspect-[4/3] flex flex-col items-center justify-center gap-4" style={{ background: f.tint }}>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white" style={{ background: f.c }}>{f.icon}</div>
                    <div className="text-xs font-semibold tracking-wide" style={{ color: f.txt }}>Capture a venir</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="py-24 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-6">Pret a voir DEVIA en action ?</h2>
          <p className="text-xl text-slate-600 mb-10">Toutes ces fonctionnalites, dans un seul logiciel pense pour les charpentiers.</p>
          <Link href="/tarifs" className="inline-flex items-center bg-slate-900 text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-slate-800 transition-colors">Voir les tarifs</Link>
        </div>
      </section>
    </>
  );
}
