import { SeriesDetail, SeriesDetails } from "@/features/series";

interface SeriesPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Server-side data fetching
async function getSeriesDetails(id: string) {
  try {
    const apiUrl = `${
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"
    }/series/${id}`;
    const response = await fetch(apiUrl, {
      next: { revalidate: 60 * 60 * 24 }, // 24 hours - series details change very slowly
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch series details: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid response format");
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error("API returned error");
    }

    return {
      data: result.data as SeriesDetails,
      loading: false,
      error: null,
    };
  } catch (error) {
    console.error("Failed to fetch series details:", error);
    return {
      data: null,
      loading: false,
      error: "Failed to load series details",
    };
  }
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  let id: string;
  try {
    const resolvedParams = await params;
    id = resolvedParams.id;
  } catch (error) {
    throw new Error("Failed to resolve series ID");
  }

  const seriesData = await getSeriesDetails(id);

  return (
    <SeriesDetail
      id={id}
      data={seriesData.data}
      loading={seriesData.loading}
      error={seriesData.error}
    />
  );
}
