import Link from "next/link";

export const metadata = {
  title: "Nos programmes - Apprentissage DEVIA",
  description: "Des videos en libre acces, trois parcours d'accompagnement et des sessions en visio a la demande. Vous terminez avec un devis pret a envoyer.",
};

const programmes = [
  {
    tag: "Demi-journee en visio",
    title: "Artisan solo",
    desc: "DEVIA s'apprend sur VOTRE premier vrai devis : une demi-journee en visio, votre catalogue renseigne, vos habitudes de chiffrage integrees. Vous terminez la session avec un devis pret a envoyer.",
    details: [
      { k: "Public", v: "Charpentiers et artisans independants" },
      { k: "Format", v: "Une demi-journee en visio, sur vos propres projets" },
      { k: "Resultat", v: "Un devis pret a envoyer, votre catalogue renseigne dans DEVIA" },
    ],
  },
  {
    tag: "Sur site ou a distance",
    title: "Entreprise",
    desc: "DEVIA se deploie dans votre equipe : formation sur site ou a distance, catalogue et regles metier integres a l'installation. Chacun repart autonome sur ses propres projets. Inclus dans la formule personnalisee.",
    details: [
      { k: "Public", v: "Entreprises de charpente et bureaux d'etudes" },
      { k: "Format", v: "Formation de l'equipe, sur site ou a distance" },
      { k: "Resultat", v: "Chaque membre autonome sur ses projets" },
    ],
  },
  {
    tag: "En construction",
    title: "Lycees & formation",
    desc: "DEVIA entre en atelier : les eleves decrivent l'ouvrage, le logiciel genere la structure, et le tableau Eurocode 5 explique chaque section. Un support pedagogique construit avec des enseignants de la filiere bois.",
    details: [
      { k: "Public", v: "Sections bois : Bac Pro, BTS, CFA" },
      { k: "Format", v: "Programme en construction avec des enseignants" },
      { k: "Resultat", v: "Le tableau Eurocode 5 comme support de cours" },
    ],
  },
  {
    tag: "Quand vous voulez",
    title: "Sessions a la demande",
    desc: "Une question technique, un point de blocage, une nouvelle fonctionnalite a prendre en main : demandez une visio ou un cours d'apprentissage cible. Pas de programme impose - vous decrivez le besoin, on planifie la session.",
    details: [
      { k: "Public", v: "Tout utilisateur DEVIA" },
      { k: "Format", v: "Visio courte ou cours cible, sur demande" },
      { k: "Resultat", v: "Votre blocage leve, sur votre propre projet" },
    ],
  },
];

export default function ProgrammesPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-widest text-amber-600 uppercase mb-4">Apprentissage</p>
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">Nos programmes</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Pas de formation theorique de trois jours. Chaque programme se construit sur
              vos propres projets, votre catalogue et vos habitudes de chiffrage, et se
              termine sur un resultat concret. Et entre deux programmes, une visio ou un
              cours se demande simplement depuis la page contact.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          {programmes.map((p) => (
            <div key={p.title} className="bg-white border border-slate-200 rounded-2xl p-8 md:p-10 grid md:grid-cols-2 gap-8">
              <div>
                <div className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold mb-4">{p.tag}</div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">{p.title}</h2>
                <p className="text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
              <div className="md:border-l md:border-slate-200 md:pl-8 flex flex-col justify-center gap-4">
                {p.details.map((d) => (
                  <div key={d.k}>
                    <div className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-1">{d.k}</div>
                    <div className="text-slate-800">{d.v}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">On en parle ?</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Chaque programme s'adapte a votre situation. Reservez un entretien, on definit
            ensemble le contenu et le planning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center bg-amber-500 text-slate-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-amber-400 transition-colors">Reserver un entretien</Link>
            <Link href="/tarifs" className="inline-flex items-center justify-center border border-slate-300 text-slate-700 px-8 py-4 rounded-lg text-base font-semibold hover:bg-slate-50 transition-colors">Voir les formules</Link>
          </div>
        </div>
      </section>
    </>
  );
}
