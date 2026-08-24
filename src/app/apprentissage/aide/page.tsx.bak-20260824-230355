import Link from "next/link";

export const metadata = {
  title: "Aide - Apprentissage DEVIA",
  description: "Support DEVIA par email : inclus 30 jours avec la formule standard, prioritaire et illimite avec la maintenance.",
};

const inclus = [
  { title: "Support par email inclus", desc: "30 jours de support inclus avec la formule standard, des l'installation. Vous ecrivez, l'equipe repond." },
  { title: "Prioritaire avec la maintenance", desc: "Avec la maintenance, le support devient prioritaire et illimite, aussi longtemps que vous utilisez DEVIA." },
  { title: "Vos remarques comptent", desc: "Un besoin, une idee de fonctionnalite : vos retours alimentent directement le developpement de DEVIA." },
];

const faq = [
  { q: "Comment contacter le support ?", a: "Par email, via la page Contact. Decrivez votre question et joignez une capture d'ecran si besoin : l'equipe vous repond directement." },
  { q: "Le support est-il inclus dans le prix ?", a: "Oui. La formule standard inclut 30 jours de support par email. Avec la maintenance, le support devient prioritaire et illimite." },
  { q: "Je ne trouve pas la reponse dans les guides ?", a: "La formation couvre les six gestes essentiels, du premier devis a l'export. Pour tout le reste, ecrivez-nous : si une question revient souvent, elle devient un guide." },
];

export default function AidePage() {
  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-widest text-amber-600 uppercase mb-4">Apprentissage</p>
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">Aide</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Une question, un blocage, une idee ? Le support DEVIA se fait par email,
              directement avec l'equipe qui developpe le logiciel. Chaque question recue
              fait progresser les guides et le produit.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {inclus.map((i) => (
              <div key={i.title} className="bg-slate-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{i.title}</h3>
                <p className="text-slate-600 leading-relaxed">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-8 text-center">Questions frequentes</h2>
          <div className="space-y-4">
            {faq.map((f) => (
              <details key={f.q} className="group bg-white border border-slate-200 rounded-2xl">
                <summary className="flex items-center justify-between cursor-pointer list-none px-6 py-5">
                  <span className="text-base font-semibold text-slate-900">{f.q}</span>
                  <span className="text-2xl font-light text-amber-600 transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <p className="px-6 pb-6 text-slate-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link href="/contact" className="inline-flex items-center justify-center bg-amber-500 text-slate-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-amber-400 transition-colors">Nous contacter</Link>
            <Link href="/apprentissage/formation-devia" className="inline-flex items-center justify-center border border-slate-300 text-slate-700 px-8 py-4 rounded-lg text-base font-semibold hover:bg-slate-50 transition-colors">Voir la formation</Link>
          </div>
        </div>
      </section>
    </>
  );
}
