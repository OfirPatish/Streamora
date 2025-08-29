"use client";

import { ContentCarousel } from "@/components/common/ContentCarousel";
import {
  useNowPlayingMovies,
  useTopRatedMovies,
  useOnTheAirSeries,
  useTopRatedSeries,
} from "@/hooks/global/useGlobalData";
import { Movie } from "@/hooks/api/useMovies";
import { Series } from "@/hooks/api/useSeries";

// Transform API data to ContentGrid format
function transformMovieData(movies: Movie[] | undefined): Array<{
  id: number;
  title: string;
  poster_path?: string | null;
  type: "movie" | "series";
}> {
  if (!movies || !Array.isArray(movies)) {
    return [];
  }

  // Show all available items from API (TMDB returns 20 per page)
  return movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    type: "movie" as const,
    poster_path: movie.poster_path,
  }));
}

function transformSeriesData(series: Series[] | undefined): Array<{
  id: number;
  title: string;
  poster_path?: string | null;
  type: "movie" | "series";
}> {
  if (!series || !Array.isArray(series)) {
    return [];
  }

  // Show all available items from API (TMDB returns 20 per page)
  return series.map((show) => ({
    id: show.id,
    title: show.name,
    type: "series" as const,
    poster_path: show.poster_path,
  }));
}

export function HomeContent() {
  // Fetch data for new releases and featured content
  const {
    data: nowPlayingMovies,
    loading: loadingNowPlayingMovies,
    error: errorNowPlayingMovies,
  } = useNowPlayingMovies();
  const { data: topRatedMovies, loading: loadingTopRatedMovies, error: errorTopRatedMovies } = useTopRatedMovies();
  const { data: onTheAirSeries, loading: loadingOnTheAirSeries, error: errorOnTheAirSeries } = useOnTheAirSeries();
  const { data: topRatedSeries, loading: loadingTopRatedSeries, error: errorTopRatedSeries } = useTopRatedSeries();

  // Debug loading states
  console.log("🏠 HomeContent Loading States:", {
    nowPlaying: loadingNowPlayingMovies,
    topRated: loadingTopRatedMovies,
    onTheAir: loadingOnTheAirSeries,
    topRatedSeries: loadingTopRatedSeries,
  });

  // Transform data for components
  const transformedNowPlayingMovies = transformMovieData(nowPlayingMovies?.results);
  const transformedTopRatedMovies = transformMovieData(topRatedMovies?.results);
  const transformedOnTheAirSeries = transformSeriesData(onTheAirSeries?.results);
  const transformedTopRatedSeries = transformSeriesData(topRatedSeries?.results);

  // Show loading state if any section is loading or if no data is available yet
  const shouldShowLoading =
    loadingNowPlayingMovies ||
    loadingTopRatedMovies ||
    loadingOnTheAirSeries ||
    loadingTopRatedSeries ||
    (!nowPlayingMovies && !topRatedMovies && !onTheAirSeries && !topRatedSeries);

  return (
    <section className="space-y-8 sm:space-y-12 w-full">
      {/* New Movie Releases */}
      <ContentCarousel
        title="New Movie Releases"
        items={transformedNowPlayingMovies}
        loading={shouldShowLoading || loadingNowPlayingMovies}
        error={errorNowPlayingMovies}
      />

      {/* Featured Movies */}
      <ContentCarousel
        title="Featured Movies"
        items={transformedTopRatedMovies}
        loading={shouldShowLoading || loadingTopRatedMovies}
        error={errorTopRatedMovies}
      />

      {/* New Series */}
      <ContentCarousel
        title="New Series"
        items={transformedOnTheAirSeries}
        loading={shouldShowLoading || loadingOnTheAirSeries}
        error={errorOnTheAirSeries}
      />

      {/* Featured Series */}
      <ContentCarousel
        title="Featured Series"
        items={transformedTopRatedSeries}
        loading={shouldShowLoading || loadingTopRatedSeries}
        error={errorTopRatedSeries}
      />
    </section>
  );
}
