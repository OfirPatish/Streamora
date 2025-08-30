import { SeriesDetail } from "@/components/sections/shared";

interface SeriesPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  let id: string;
  try {
    const resolvedParams = await params;
    id = resolvedParams.id;
  } catch (error) {
    throw new Error("Failed to resolve series ID");
  }

  return <SeriesDetail id={id} />;
}
