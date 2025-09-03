import { ContentItem, Movie, Series, DisplayContentItem } from "../types";

// Transform API data to ContentDisplay format
export function transformMovieData(
  movies: Movie[] | undefined
): DisplayContentItem[] {
  if (!movies || !Array.isArray(movies)) {
    return [];
  }

  return movies.map((movie, index) => ({
    ...movie,
    // Ensure required fields are present
    id: movie.id,
    title: movie.title,
    name: movie.title, // Map title to name for consistency
    release_date: movie.release_date,
    first_air_date: movie.release_date, // Map for consistency
    // Transform popularity to viewCount for display
    viewCount: movie.popularity ? Math.round(movie.popularity) : undefined,
    // Use release date since runtime is not available in basic endpoints
    duration: movie.release_date
      ? new Date(movie.release_date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      : undefined,
    // For display purposes, add some computed fields
    displayTitle: movie.title,
    displayYear: movie.release_date
      ? new Date(movie.release_date).getFullYear().toString()
      : "N/A",
    displayGenre: "Movie",
    displayType: "movie" as const,
    displayIndex: index,
    displayRating: movie.vote_average,
    displayPosterPath: movie.poster_path,
  }));
}

export function transformSeriesData(
  series: Series[] | undefined
): DisplayContentItem[] {
  if (!series || !Array.isArray(series)) {
    return [];
  }

  return series.map((show, index) => ({
    ...show,
    // Ensure required fields are present
    id: show.id,
    name: show.name,
    title: show.name, // Map name to title for consistency
    first_air_date: show.first_air_date,
    release_date: show.first_air_date, // Map for consistency
    // Transform popularity to viewCount for display
    viewCount: show.popularity ? Math.round(show.popularity) : undefined,
    // Use first air date since episode_run_time is not available in basic endpoints
    duration: show.first_air_date
      ? new Date(show.first_air_date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      : undefined,
    // For display purposes, add some computed fields
    displayTitle: show.name,
    displayYear: show.first_air_date
      ? new Date(show.first_air_date).getFullYear().toString()
      : "N/A",
    displayGenre: "TV Show",
    displayType: "series" as const,
    displayIndex: index,
    displayRating: show.vote_average,
    displayPosterPath: show.poster_path,
  }));
}

// Create featured content for hero banner (mix of movies and series)
export function createFeaturedContent(
  nowPlayingMovies: Movie[] | undefined,
  topRatedSeries: Series[] | undefined
): DisplayContentItem[] {
  return [
    ...(nowPlayingMovies?.slice(0, 3) || []).map((item) => ({
      ...item,
      displayType: "movie" as const,
    })),
    ...(topRatedSeries?.slice(0, 2) || []).map((item) => ({
      ...item,
      title: item.name, // Map 'name' to 'title' for series
      displayType: "series" as const,
    })),
  ];
}
