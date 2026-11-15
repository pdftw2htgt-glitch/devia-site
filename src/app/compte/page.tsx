import EspaceCompte from "../../contenu/EspaceCompte";

// Espace personnel : pas de reference dans les moteurs de recherche.
export const metadata = {
  title: "DEVIA - Mon compte",
  robots: { index: false, follow: false },
};

export default function ComptePage() {
  return <EspaceCompte lang="fr" achatOuvert={process.env.ACHAT_OUVERT === "1"} />;
}
