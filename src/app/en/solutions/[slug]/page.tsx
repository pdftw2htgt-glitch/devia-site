import FicheSolution, { FICHES, metaFiche } from "../../../../contenu/FicheSolution";

export function generateStaticParams() {
  return FICHES.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return metaFiche("en", slug);
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <FicheSolution lang="en" slug={slug} />;
}
