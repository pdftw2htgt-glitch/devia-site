import Link from "next/link";
import { notFound } from "next/navigation";
import { dico, lien, type Langue } from "../i18n";
import { GUIDES } from "./FormationDevia";

// Titre et description de l onglet du navigateur, dans la langue de la page.
export function metaGuide(lang: Langue, slug: string) {
  const i = GUIDES.indexOf(slug);
  if (i < 0) return {};
  const t = dico(lang).guides;
  return { title: t["g" + i + "T"] + " - " + t.eyebrowGuide, description: t["g" + i + "I"] };
}

export default function Guide({ lang, slug }: { lang: Langue; slug: string }) {
  const i = GUIDES.indexOf(slug);
  if (i < 0) notFound();
  const t = dico(lang).guides;
  const L = (c: string) => lien(lang, c);
  const nb = Number(t["g" + i + "N"]);
  const etapes = Array.from({ length: nb }, (x, k) => ({ t: t["g" + i + "E" + k + "T"], d: t["g" + i + "E" + k + "D"] }));

  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-widest text-amber-600 uppercase mb-4">{t.eyebrowGuide} {"0" + (i + 1)}</p>
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">{t["g" + i + "T"]}</h1>
            <p className="text-xl text-slate-600 leading-relaxed">{t["g" + i + "I"]}</p>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-10">{t.commentFaire}</h2>
          <div className="space-y-8">
            {etapes.map((e, k) => (
              <div key={e.t} className="flex gap-5">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-900 font-bold flex items-center justify-center shrink-0">{k + 1}</div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{e.t}</h3>
                  <p className="text-slate-600 leading-relaxed">{e.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
            <p className="text-sm font-semibold tracking-wide text-slate-500">{t.videoAVenir}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-lg text-slate-600 mb-8">{t.aideTexte}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={L("/apprentissage/formation-devia")} className="inline-flex items-center justify-center border border-slate-300 text-slate-700 px-8 py-4 rounded-lg text-base font-semibold hover:bg-white transition-colors">{t.cta1}</Link>
            <Link href={L("/contact")} className="inline-flex items-center justify-center bg-amber-500 text-slate-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-amber-400 transition-colors">{t.cta2}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
