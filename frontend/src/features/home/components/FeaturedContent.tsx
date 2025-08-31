"use client";

import { FeaturedCarousel } from "./FeaturedCarousel";
import { Movie, Series } from "../types";

// Transform API data to ContentGrid format
function transformMovieData(movies: Movie[] | undefined): Array<{
  id: number;
  title: string;
  year: string;
  genre: string;
  type: "movie";
  index: number;
  rating?: number;
  isNew?: boolean;
  posterPath?: string | null;
  description?: string;
}> {
  if (!movies || !Array.isArray(movies)) {
    return [];
  }

  // Show all available items from API (TMDB returns 20 per page)
  return movies.map((movie, index) => ({
    id: movie.id,
    title: movie.title,
    year: movie.release_date ? new Date(movie.release_date).getFullYear().toString() : "N/A",
    genre: "Movie",
    type: "movie" as const,
    index,
    rating: movie.vote_average,
    isNew: false,
    posterPath: movie.poster_path,
    description: movie.overview,
  }));
}

function transformSeriesData(series: Series[] | undefined): Array<{
  id: number;
  title: string;
  year: string;
  genre: string;
  type: "series";
  index: number;
  rating?: number;
  isNew?: boolean;
  posterPath?: string | null;
  description?: string;
}> {
  if (!series || !Array.isArray(series)) {
    return [];
  }

  // Show all available items from API (TMDB returns 20 per page)
  return series.map((show, index) => ({
    id: show.id,
    title: show.name,
    year: show.first_air_date ? new Date(show.first_air_date).getFullYear().toString() : "N/A",
    genre: "TV Show",
    type: "series" as const,
    index,
    rating: show.vote_average,
    isNew: false,
    posterPath: show.poster_path,
    description: show.overview,
  }));
}

interface HomeContentProps {
  nowPlayingMovies: any[];
  topRatedMovies: any[];
  onTheAirSeries: any[];
  topRatedSeries: any[];
  loading: boolean;
  error: string | null;
}

export function HomeContent({
  nowPlayingMovies,
  topRatedMovies,
  onTheAirSeries,
  topRatedSeries,
  loading,
  error,
}: HomeContentProps) {
  // Transform data for components using passed props
  const transformedNowPlayingMovies = transformMovieData(nowPlayingMovies);
  const transformedTopRatedMovies = transformMovieData(topRatedMovies);
  const transformedOnTheAirSeries = transformSeriesData(onTheAirSeries);
  const transformedTopRatedSeries = transformSeriesData(topRatedSeries);

  return (
    <section className="w-full py-4">
      <div className="space-y-2">
        {/* Now Playing Movies */}
        <FeaturedCarousel
          title="Now Playing Movies"
          items={transformedNowPlayingMovies}
          loading={loading}
          error={error}
        />

        {/* Top Rated Movies */}
        <FeaturedCarousel title="Top Rated Movies" items={transformedTopRatedMovies} loading={loading} error={error} />

        {/* On The Air TV Shows */}
        <FeaturedCarousel
          title="On The Air TV Shows"
          items={transformedOnTheAirSeries}
          loading={loading}
          error={error}
        />

        {/* Top Rated TV Shows */}
        <FeaturedCarousel
          title="Top Rated TV Shows"
          items={transformedTopRatedSeries}
          loading={loading}
          error={error}
        />
      </div>
    </section>
  );
}
