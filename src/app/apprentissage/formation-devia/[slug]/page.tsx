import Guide, { metaGuide } from "../../../../contenu/Guide";
import { GUIDES } from "../../../../contenu/FormationDevia";

export function generateStaticParams() {
  return GUIDES.map((slug) => ({ slug: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return metaGuide("fr", slug);
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <Guide lang="fr" slug={slug} />;
}
