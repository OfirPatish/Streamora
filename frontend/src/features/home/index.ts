// ============================================================================
// HOME FEATURE - Barrel Exports
// ============================================================================

// Components
export { HeroBanner } from "./components/HeroBanner";
export { HomeContent } from "./components/FeaturedContent";
export { FeaturedCard } from "./components/FeaturedCard";
export { FeaturedCarousel } from "./components/FeaturedCarousel";

// Hooks
export { useFeaturedContent } from "./hooks/useHeroQueries";
export {
  useHomeData,
  useHomeMovieData,
  useHomeSeriesData,
  useNowPlayingMovies,
  useTopRatedMovies,
  useOnTheAirSeries,
  useTopRatedSeries,
} from "./hooks/useHomeQueries";

// Types
export type { HomeFeatureTypes } from "./types";
