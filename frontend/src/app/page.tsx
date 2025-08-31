import { PageTemplate } from "@/components/layout/PageTemplate";
import { HeroBanner, HomeContent } from "@/features/home";

// Server-side data fetching
async function getFeaturedData() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

    // Fetch featured content for hero banner
    const [moviesRes, seriesRes, nowPlayingRes, topRatedMoviesRes, onTheAirRes, topRatedSeriesRes] = await Promise.all([
      fetch(`${apiUrl}/movies/popular`, { next: { revalidate: 60 * 60 } }), // 1 hour
      fetch(`${apiUrl}/series/popular`, { next: { revalidate: 60 * 60 } }),
      fetch(`${apiUrl}/movies/now-playing`, { next: { revalidate: 60 * 60 } }),
      fetch(`${apiUrl}/movies/top-rated`, { next: { revalidate: 60 * 60 * 12 } }), // 12 hours
      fetch(`${apiUrl}/series/on-the-air`, { next: { revalidate: 60 * 60 } }),
      fetch(`${apiUrl}/series/top-rated`, { next: { revalidate: 60 * 60 * 12 } }),
    ]);

    const [movies, series, nowPlaying, topRatedMovies, onTheAir, topRatedSeries] = await Promise.all([
      moviesRes.ok ? moviesRes.json() : { success: false, data: { results: [] } },
      seriesRes.ok ? seriesRes.json() : { success: false, data: { results: [] } },
      nowPlayingRes.ok ? nowPlayingRes.json() : { success: false, data: { results: [] } },
      topRatedMoviesRes.ok ? topRatedMoviesRes.json() : { success: false, data: { results: [] } },
      onTheAirRes.ok ? onTheAirRes.json() : { success: false, data: { results: [] } },
      topRatedSeriesRes.ok ? topRatedSeriesRes.json() : { success: false, data: { results: [] } },
    ]);

    return {
      featuredContent: movies.success ? movies.data.results.slice(0, 10) : [],
      topMovie:
        topRatedMovies.success && topRatedMovies.data.results.length > 0 ? topRatedMovies.data.results[0] : null,
      topSeries:
        topRatedSeries.success && topRatedSeries.data.results.length > 0 ? topRatedSeries.data.results[0] : null,
      nowPlayingMovies: nowPlaying.success ? nowPlaying.data.results : [],
      topRatedMovies: topRatedMovies.success ? topRatedMovies.data.results : [],
      onTheAirSeries: onTheAir.success ? onTheAir.data.results : [],
      topRatedSeries: topRatedSeries.success ? topRatedSeries.data.results : [],
      loading: false,
      error: null,
    };
  } catch (error) {
    console.error("Failed to fetch featured data:", error);
    return {
      featuredContent: [],
      topMovie: null,
      topSeries: null,
      nowPlayingMovies: [],
      topRatedMovies: [],
      onTheAirSeries: [],
      topRatedSeries: [],
      loading: false,
      error: "Failed to load content",
    };
  }
}

export default async function Home() {
  const data = await getFeaturedData();

  return (
    <PageTemplate>
      {/* Netflix-style Hero Section with server data */}
      <HeroBanner
        featuredContent={data.featuredContent}
        topMovie={data.topMovie}
        topSeries={data.topSeries}
        loading={data.loading}
        error={data.error}
      />

      {/* Content Sections with server data */}
      <div className="bg-background">
        <HomeContent
          nowPlayingMovies={data.nowPlayingMovies}
          topRatedMovies={data.topRatedMovies}
          onTheAirSeries={data.onTheAirSeries}
          topRatedSeries={data.topRatedSeries}
          loading={data.loading}
          error={data.error}
        />
      </div>
    </PageTemplate>
  );
}
