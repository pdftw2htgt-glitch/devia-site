import type { MetadataRoute } from "next";
import { FICHES } from "../contenu/FicheSolution";
import { GUIDES } from "../contenu/FormationDevia";

// Plan du site, en francais et en anglais. Chaque adresse declare sa jumelle dans
// l autre langue (hreflang) : les moteurs servent la bonne version selon le visiteur
// au lieu de considerer les deux pages comme des doublons.
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://devia-site.vercel.app";

const PAGES = [
  "/",
  "/fonctionnalites",
  "/solutions",
  "/apprentissage",
  "/apprentissage/formation-devia",
  "/apprentissage/programmes",
  "/apprentissage/aide",
  "/actualite",
  "/tarifs",
  "/a-propos",
  "/contact",
  "/cgv",
  "/mentions-legales",
]
  .concat(FICHES.map((f) => "/solutions/" + f.id))
  .concat(GUIDES.map((g) => "/apprentissage/formation-devia/" + g));

export default function sitemap(): MetadataRoute.Sitemap {
  const enAnglais = (c: string) => (c === "/" ? "/en" : "/en" + c);
  const lignes: MetadataRoute.Sitemap = [];
  PAGES.forEach((c) => {
    const alternates = { languages: { fr: SITE + c, en: SITE + enAnglais(c) } };
    lignes.push({ url: SITE + c, alternates: alternates });
    lignes.push({ url: SITE + enAnglais(c), alternates: alternates });
  });
  return lignes;
}
