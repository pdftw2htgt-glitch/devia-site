// Liste les textes presents en francais et pas encore traduits en anglais.
// Usage : node verifier-traductions.mjs
import fr from "./src/i18n/fr.json" with { type: "json" };
import en from "./src/i18n/en.json" with { type: "json" };

let manquants = 0;
for (const page of Object.keys(fr)) {
  const absentes = Object.keys(fr[page]).filter((k) => (en[page] || {})[k] === undefined);
  if (absentes.length > 0) {
    console.log("\n" + page + " : " + absentes.length + " a traduire");
    absentes.forEach((k) => console.log("   " + k + " = " + JSON.stringify(fr[page][k]).slice(0, 80)));
    manquants += absentes.length;
  }
}
console.log(manquants === 0 ? "\nTout est traduit." : "\n" + manquants + " texte(s) a traduire.");
