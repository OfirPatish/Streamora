import { PageTemplate } from "@/components/layout/PageTemplate";
import { ListingPageWrapper } from "@/components/layout/ListingPageWrapper";
import { PaginatedContentSection } from "@/components/shared";

// Server-side data fetching for movies
async function getMoviesData() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

    // Fetch the first page of popular movies by default
    const response = await fetch(`${apiUrl}/movies/popular?page=1`, {
      next: { revalidate: 60 * 60 }, // 1 hour cache
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.status}`);
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
    console.error("Failed to fetch movies data:", error);
    return {
      initialData: [],
      totalResults: 0,
      totalPages: 0,
      loading: false,
      error: "Failed to load movies",
    };
  }
}

export default async function MoviesPage() {
  const moviesData = await getMoviesData();

  return (
    <PageTemplate>
      <ListingPageWrapper
        showHero={true}
        heroContent={
          <div className="text-center sm:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent mb-4 tracking-tight">
              🎬 Movies
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl font-medium">
              Discover amazing movies across different categories
            </p>
          </div>
        }
      >
        <PaginatedContentSection
          type="movie"
          initialData={moviesData.initialData}
          totalResults={moviesData.totalResults}
          totalPages={moviesData.totalPages}
          loading={moviesData.loading}
          error={moviesData.error}
        />
      </ListingPageWrapper>
    </PageTemplate>
  );
}
