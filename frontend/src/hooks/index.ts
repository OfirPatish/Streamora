// Main hooks index - export all hooks

// API hooks
export { useMovieDetails, useSeriesDetails } from "./api/useDetailQueries";
export { useSearch } from "./api/useSearch";
// Search hooks removed - now using TanStack Query in useSearch

// UI hooks
export { useIsMobile } from "./ui/useMobile";
export { useSplitScreen } from "./ui/useSplitScreen";
export { useInfiniteScroll } from "./ui/useInfiniteScroll";

// Pagination hooks
export { usePaginatedContent } from "./api/usePaginatedContent";

// Advanced features
export { usePrefetch } from "./api/usePrefetch";
export { useOptimisticUpdates } from "./api/useOptimisticUpdates";

// Home page queries (TanStack Query)
export {
  useNowPlayingMovies,
  useTopRatedMovies,
  useOnTheAirSeries,
  useTopRatedSeries,
  useHomeData,
} from "./api/useHomeQueries";

// Hero section queries (TanStack Query)
export { useFeaturedContent } from "./api/useHeroQueries";
