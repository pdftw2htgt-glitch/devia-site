import SignalerProbleme from "@/components/SignalerProbleme";
import { dico, type Langue } from "../i18n";

export default function Contact({ lang }: { lang: Langue }) {
  const t = dico(lang).contact;

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">{t.h1}</h1>
        <p className="text-xl text-slate-600 mb-12">{t.intro}</p>

        <div className="bg-slate-50 rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">{t.emailTitre}</h2>
          <p className="text-slate-700 mb-2">{t.emailTexte}</p>
          <a href="mailto:contact@devia.fr" className="text-amber-700 font-semibold hover:underline">
            contact@devia.fr
          </a>
        </div>

        <div className="bg-slate-50 rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">{t.demoTitre}</h2>
          <p className="text-slate-700 mb-4">{t.demoTexte}</p>
          <a
            href={"mailto:demo@devia.fr?subject=" + encodeURIComponent(t.demoSujet)}
            className="inline-flex items-center bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
          >
            {t.demoCta}
          </a>
        </div>

        <SignalerProbleme />
      </div>
    </section>
  );
}
