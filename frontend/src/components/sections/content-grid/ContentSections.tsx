"use client";

import { ContentGrid } from "./ContentGrid";
import { useNowPlayingMovies, useTopRatedMovies, useOnTheAirSeries, useTopRatedSeries, Movie, Series } from "@/hooks";

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

  return movies.slice(0, 6).map((movie) => ({
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

  return series.slice(0, 6).map((show) => ({
    id: show.id,
    title: show.name,
    year: show.first_air_date ? new Date(show.first_air_date).getFullYear().toString() : "TBA",
    genre: show.genres?.[0]?.name || "Series",
    type: "series" as const,
    poster_path: show.poster_path,
    vote_average: show.vote_average,
  }));
}

export function ContentSections() {
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
    <section className="space-y-12 w-full px-6">
      {/* New Movie Releases */}
      <ContentGrid
        title="New Movie Releases"
        items={transformedNowPlayingMovies}
        loading={loadingNowPlayingMovies}
        error={errorNowPlayingMovies}
      />

      {/* Featured Movies */}
      <ContentGrid
        title="Featured Movies"
        items={transformedTopRatedMovies}
        loading={loadingTopRatedMovies}
        error={errorTopRatedMovies}
      />

      {/* New Series */}
      <ContentGrid
        title="New Series"
        items={transformedOnTheAirSeries}
        loading={loadingOnTheAirSeries}
        error={errorOnTheAirSeries}
      />

      {/* Featured Series */}
      <ContentGrid
        title="Featured Series"
        items={transformedTopRatedSeries}
        loading={loadingTopRatedSeries}
        error={errorTopRatedSeries}
      />
    </section>
  );
}
