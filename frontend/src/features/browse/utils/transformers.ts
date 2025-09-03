import { ContentItem } from "../types";

// Transform API data to ContentDisplay format
export function transformMovieData(movies: any[] | undefined): ContentItem[] {
  if (!movies || !Array.isArray(movies)) {
    return [];
  }

  return movies.map((movie, index) => ({
    id: movie.id,
    title: movie.title,
    year: movie.release_date
      ? new Date(movie.release_date).getFullYear().toString()
      : "N/A",
    genre: "Movie",
    type: "movie" as const,
    index,
    rating: movie.vote_average,
    isNew: false,
    posterPath: movie.poster_path,
    viewCount: movie.popularity ? Math.round(movie.popularity) : undefined,
    duration: movie.runtime ? `${movie.runtime} min` : undefined,
    releaseDate: movie.release_date
      ? new Date(movie.release_date).toLocaleDateString()
      : undefined,
  }));
}

export function transformSeriesData(series: any[] | undefined): ContentItem[] {
  if (!series || !Array.isArray(series)) {
    return [];
  }

  return series.map((show, index) => ({
    id: show.id,
    title: show.name,
    year: show.first_air_date
      ? new Date(show.first_air_date).getFullYear().toString()
      : "N/A",
    genre: "TV Show",
    type: "series" as const,
    index,
    rating: show.vote_average,
    isNew: false,
    posterPath: show.poster_path,
    viewCount: show.popularity ? Math.round(show.popularity) : undefined,
    episodeCount: show.number_of_episodes || undefined,
  }));
}

// Create featured content for hero banner (mix of movies and series)
export function createFeaturedContent(
  nowPlayingMovies: any[] | undefined,
  topRatedSeries: any[] | undefined
) {
  return [
    ...(nowPlayingMovies?.slice(0, 3) || []).map((item) => ({
      ...item,
      type: "movie" as const,
    })),
    ...(topRatedSeries?.slice(0, 2) || []).map((item) => ({
      ...item,
      title: item.name, // Map 'name' to 'title' for series
      type: "series" as const,
    })),
  ];
}
