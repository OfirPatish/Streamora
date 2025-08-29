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
  year: string;
  genre: string;
  type: "movie";
  index: number;
  rating?: number;
  isNew?: boolean;
  posterPath?: string | null;
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

  // Show loading state if any section is loading or if no data is available yet
  const shouldShowLoading =
    loadingNowPlayingMovies ||
    loadingTopRatedMovies ||
    loadingOnTheAirSeries ||
    loadingTopRatedSeries ||
    (!nowPlayingMovies && !topRatedMovies && !onTheAirSeries && !topRatedSeries);

  return (
    <section className="w-full py-8 sm:py-12">
      <div className="space-y-8 sm:space-y-10">
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
      </div>
    </section>
  );
}
