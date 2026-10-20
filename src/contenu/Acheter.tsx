import BoutonAchat from "../components/BoutonAchat";
import { dico, type Langue } from "../i18n";

// Page d essai du parcours d achat, volontairement nue : elle sert a valider la chaine
// paiement -> webhook -> cle avant d ajouter le bouton sur la vraie page Tarifs.
export default function Acheter({ lang }: { lang: Langue }) {
  const t = dico(lang).achat;
  return (
    <main style={{ maxWidth: 620, margin: "0 auto", padding: "80px 24px", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>{t.acTitre}</h1>
      <p style={{ opacity: 0.8, lineHeight: 1.6, marginBottom: 26 }}>{t.acIntro}</p>
      <BoutonAchat lang={lang} />
    </main>
  );
}
