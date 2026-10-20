// Dictionnaires de traduction. Une seule version du code, un fichier de textes par langue :
// ajouter l allemand ou l espagnol ne demandera qu un fichier de plus ici.
import fr from "./fr.json";
import en from "./en.json";

export type Langue = "fr" | "en";

type Bloc = Record<string, string>;
type Dictionnaire = Record<string, Bloc>;

const FR = fr as Dictionnaire;
const EN = en as Dictionnaire;

// Repli automatique sur le francais, cle par cle. Un texte ajoute en francais et pas
// encore traduit s affiche donc EN FRANCAIS sur la page anglaise, au lieu de laisser
// un trou invisible. Rien ne casse, et la traduction peut venir plus tard.
export function dico(lang: Langue) {
  if (lang === "fr") return FR;
  const fusion: Dictionnaire = {};
  Object.keys(FR).forEach((page) => {
    fusion[page] = { ...FR[page], ...(EN[page] || {}) };
  });
  return fusion;
}

// Prefixe les liens internes : /tarifs en francais, /en/tarifs en anglais.
// Les URL francaises ne changent pas, ce qui preserve le referencement deja acquis.
export function lien(lang: Langue, chemin: string) {
  return lang === "en" ? "/en" + chemin : chemin;
}
