// ============================================================================
// CONTENT FEATURE - Barrel Exports
// ============================================================================

// Components
export { ContentBanner } from "./components/ContentBanner";
export { ContentGrid } from "./components/ContentGrid";
export { MediaCard } from "./components/MediaCard";
export { ContentCarousel } from "./components/ContentCarousel";
export { HeroBanner } from "./components/HeroBanner";
export {
  ContentDisplay,
  ContentGrid as Grid,
  ContentCarousel as Carousel,
} from "./components/ContentDisplay";
export { MediaCard as Card } from "./components/MediaCard";

// Hooks
export { useContentHero } from "./hooks/useContentQueries";
export {
  useContentData,
  useContentMovieData,
  useContentSeriesData,
  useNowPlayingMovies,
  useTopRatedMovies,
  useOnTheAirSeries,
  useTopRatedSeries,
} from "./hooks/useContentData";

// Utils
export {
  transformMovieData,
  transformSeriesData,
  createFeaturedContent,
} from "./utils/transformers";
