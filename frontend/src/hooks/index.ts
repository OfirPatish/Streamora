// Main hooks index - export all hooks

// Global hooks
export { useGlobalData } from "./global/useGlobalData";

// API hooks
export { useApi } from "./api/useApi";
export { useFeaturedContent } from "./api/useFeaturedContent";
export {
  usePopularMovies,
  useTopRatedMovies,
  useNowPlayingMovies,
  useUpcomingMovies,
  useMovieDetails,
  useMovieCredits,
  useMovieVideos,
  useMovieSearch,
} from "./api/useMovies";
export {
  usePopularSeries,
  useTopRatedSeries,
  useOnTheAirSeries,
  useAiringTodaySeries,
  useSeriesDetails,
  useSeriesCredits,
  useSeriesVideos,
  useSeasonDetails,
  useSeriesSearch,
} from "./api/useSeries";
export { useSearch } from "./api/useSearch";
export {
  useMultiSearch,
  useMovieSearch as useApiMovieSearch,
  useSeriesSearch as useApiSeriesSearch,
  usePersonSearch,
  useDiscoverMovies,
} from "./api/useApiSearch";

// UI hooks
export { useIsMobile } from "./ui/useMobile";
