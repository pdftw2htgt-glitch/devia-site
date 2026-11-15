import EspaceCompte from "../../../contenu/EspaceCompte";

// Personal area: kept out of search engines.
export const metadata = {
  title: "DEVIA - My account",
  robots: { index: false, follow: false },
};

export default function ComptePageEn() {
  return <EspaceCompte lang="en" achatOuvert={process.env.ACHAT_OUVERT === "1"} />;
}
