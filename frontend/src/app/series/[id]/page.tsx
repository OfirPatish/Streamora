import { SeriesDetail } from "@/features/series";
import { ContentService } from "@/services";

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

  const seriesData = await ContentService.getSeriesDetails(id);

  return <SeriesDetail id={id} data={seriesData.data} loading={false} error={seriesData.error || null} />;
}
