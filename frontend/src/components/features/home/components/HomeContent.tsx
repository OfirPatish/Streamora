"use client";

import { ContentCarousel } from "@/components/common";
import { useNowPlayingMovies, useTopRatedMovies, useOnTheAirSeries, useTopRatedSeries } from "@/hooks/useGlobalData";
import { Movie } from "@/components/features/movies/hooks/useMovies";
import { Series } from "@/components/features/series/hooks/useSeries";

// Transform API data to ContentGrid format
function transformMovieData(movies: Movie[] | undefined): Array<{
  id: number;
  title: string;
  year: string;
  genre: string;
  type: "movie" | "series";
  poster_path?: string | null;
  vote_average?: number;
}> {
  if (!movies || !Array.isArray(movies)) {
    return [];
  }

  // Show all available items from API (TMDB returns 20 per page)
  return movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    year: movie.release_date ? new Date(movie.release_date).getFullYear().toString() : "TBA",
    genre: movie.genres?.[0]?.name || "Movie",
    type: "movie" as const,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
  }));
}

function transformSeriesData(series: Series[] | undefined): Array<{
  id: number;
  title: string;
  year: string;
  genre: string;
  type: "movie" | "series";
  poster_path?: string | null;
  vote_average?: number;
}> {
  if (!series || !Array.isArray(series)) {
    return [];
  }

  // Show all available items from API (TMDB returns 20 per page)
  return series.map((show) => ({
    id: show.id,
    title: show.name,
    year: show.first_air_date ? new Date(show.first_air_date).getFullYear().toString() : "TBA",
    genre: show.genres?.[0]?.name || "Series",
    type: "series" as const,
    poster_path: show.poster_path,
    vote_average: show.vote_average,
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

  // Transform data for components
  const transformedNowPlayingMovies = transformMovieData(nowPlayingMovies?.results);
  const transformedTopRatedMovies = transformMovieData(topRatedMovies?.results);
  const transformedOnTheAirSeries = transformSeriesData(onTheAirSeries?.results);
  const transformedTopRatedSeries = transformSeriesData(topRatedSeries?.results);

  return (
    <section className="space-y-8 sm:space-y-12 w-full">
      {/* New Movie Releases */}
      <ContentCarousel
        title="New Movie Releases"
        items={transformedNowPlayingMovies}
        loading={loadingNowPlayingMovies}
        error={errorNowPlayingMovies}
      />

      {/* Featured Movies */}
      <ContentCarousel
        title="Featured Movies"
        items={transformedTopRatedMovies}
        loading={loadingTopRatedMovies}
        error={errorTopRatedMovies}
      />

      {/* New Series */}
      <ContentCarousel
        title="New Series"
        items={transformedOnTheAirSeries}
        loading={loadingOnTheAirSeries}
        error={errorOnTheAirSeries}
      />

      {/* Featured Series */}
      <ContentCarousel
        title="Featured Series"
        items={transformedTopRatedSeries}
        loading={loadingTopRatedSeries}
        error={errorTopRatedSeries}
      />
    </section>
  );
}
