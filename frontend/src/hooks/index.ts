// API Hooks
export { useApi, useAsyncApi } from "./useApi";

// Global Data Hooks (Single source of truth for main page data)
export {
  useGlobalData,
  usePopularMovies,
  useTopRatedMovies,
  useNowPlayingMovies,
  useUpcomingMovies,
  usePopularSeries,
  useTopRatedSeries,
  useOnTheAirSeries,
  useAiringTodaySeries,
  refreshGlobalData,
} from "./useGlobalData";
