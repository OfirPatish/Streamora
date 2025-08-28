// API Hooks
export { useApi, useAsyncApi } from "./useApi";

// Movie Hooks
export {
  usePopularMovies,
  useTopRatedMovies,
  useNowPlayingMovies,
  useUpcomingMovies,
  useMovieDetails,
  useMovieCredits,
  useMovieVideos,
  useMovieSearch,
  type Movie,
} from "./useMovies";

// Series Hooks
export {
  usePopularSeries,
  useTopRatedSeries,
  useOnTheAirSeries,
  useAiringTodaySeries,
  useSeriesDetails,
  useSeriesCredits,
  useSeriesVideos,
  useSeasonDetails,
  useEpisodeDetails,
  useSeriesSearch,
  type Series,
  type Episode,
} from "./useSeries";

// API Search Hooks
export {
  useMultiSearch,
  useMovieSearch as useMovieSearchApi,
  useSeriesSearch as useSeriesSearchApi,
  usePersonSearch,
  useDiscoverMovies,
  useDiscoverSeries,
  useMovieGenres,
  useSeriesGenres,
  type Person,
  type MultiSearchResult,
  type Genre,
  type DiscoverFilters,
} from "./useApiSearch";
