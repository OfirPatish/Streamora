import { PageTemplate } from "@/components/layout/PageTemplate";
import { ListingPageWrapper } from "@/components/layout/ListingPageWrapper";
import { PaginatedContentSection } from "@/components/shared";

// Server-side data fetching for series
async function getSeriesData() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

    // Fetch the first page of popular series by default
    const response = await fetch(`${apiUrl}/series/popular?page=1`, {
      next: { revalidate: 60 * 60 }, // 1 hour cache
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch series: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error("API returned error");
    }

    return {
      initialData: result.data.results || [],
      totalResults: result.data.total_results || 0,
      totalPages: result.data.total_pages || 0,
      loading: false,
      error: null,
    };
  } catch (error) {
    console.error("Failed to fetch series data:", error);
    return {
      initialData: [],
      totalResults: 0,
      totalPages: 0,
      loading: false,
      error: "Failed to load series",
    };
  }
}

export default async function SeriesPage() {
  const seriesData = await getSeriesData();

  return (
    <PageTemplate>
      <ListingPageWrapper showHero={false}>
        <PaginatedContentSection
          type="series"
          initialData={seriesData.initialData}
          totalResults={seriesData.totalResults}
          totalPages={seriesData.totalPages}
          loading={seriesData.loading}
          error={seriesData.error}
        />
      </ListingPageWrapper>
    </PageTemplate>
  );
}
