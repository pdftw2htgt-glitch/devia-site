import Link from "next/link";

export const metadata = {
  title: "Apprentissage - DEVIA",
  description: "Formation DEVIA, programmes d'accompagnement et aide : maitrisez le logiciel de devis charpente en quelques minutes.",
};

const rubriques = [
  {
    href: "/apprentissage/formation-devia",
    tag: "6 guides",
    title: "Formation DEVIA",
    desc: "Prenez le logiciel en main pas a pas : premier devis, import de plans, catalogue de prix, tableau Eurocode 5, exports PDF et IFC.",
    points: ["Votre premier devis en quelques secondes", "Lire les sections mini et conseillees", "Exporter en PDF et en IFC"],
  },
  {
    href: "/apprentissage/programmes",
    tag: "3 parcours",
    title: "Nos programmes",
    desc: "Un accompagnement construit sur vos propres projets, selon votre profil. Vous terminez avec un devis pret a envoyer.",
    points: ["Artisan solo : demi-journee en visio", "Entreprise : formation de l'equipe", "Lycees & formation : en construction"],
  },
  {
    href: "/apprentissage/aide",
    tag: "Support",
    title: "Aide",
    desc: "Le support par email est inclus : 30 jours avec la formule standard, prioritaire et illimite avec la maintenance.",
    points: ["Support par email inclus", "Prioritaire avec la maintenance", "Vos retours ameliorent DEVIA"],
  },
];

export default function ApprentissagePage() {
  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Maitrisez DEVIA
              <br />
              <span className="text-amber-600">en quelques minutes.</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Pas de formation de trois jours. Des videos courtes en libre acces,
              des programmes d'accompagnement, et des sessions en visio a la demande.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {rubriques.map((r) => (
              <Link key={r.href} href={r.href} className="group bg-white border border-slate-200 rounded-2xl p-8 flex flex-col hover:shadow-lg hover:border-amber-300 transition-all">
                <div className="inline-flex self-start items-center px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold mb-4">{r.tag}</div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">{r.title}</h2>
                <p className="text-slate-600 leading-relaxed mb-6">{r.desc}</p>
                <div className="space-y-2 mb-8">
                  {r.points.map((p) => (
                    <div key={p} className="flex items-start gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 mt-1 shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-sm text-slate-700">{p}</span>
                    </div>
                  ))}
                </div>
                <span className="mt-auto text-amber-600 font-semibold group-hover:underline">En savoir plus →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
