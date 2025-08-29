// Main components index - export all components

// Home components
export { HeroSection } from "./home/HeroSection";
export { HeroContent } from "./home/HeroContent";
export { HeroInfo } from "./home/HeroInfo";
export { CarouselControls } from "./home/CarouselControls";
export { HomeContent } from "./home/HomeContent";
export { SplitScreenPanel } from "./home/SplitScreenPanel";
export { MobileHeroCard } from "./home/MobileHeroCard";

// Movie components
export { MovieDetail } from "./movies/MovieDetail";
export { MoviesContent } from "./movies/MoviesContent";

// Series components
export { SeriesDetail } from "./series/SeriesDetail";
export { SeriesContent } from "./series/SeriesContent";

// Search components
export { SearchFilters } from "./search/SearchFilters";
export { SearchResults } from "./search/SearchResults";
export { SearchSuggestions } from "./search/SearchSuggestions";

// Layout components
export { DesktopHeader } from "./layout/DesktopHeader";
export { MobileHeader } from "./layout/MobileHeader";
export { MobileBottomNav } from "./layout/MobileBottomNav";

// Common components
export { MovieCard } from "./common/MovieCard";
export { ContentCarousel } from "./common/ContentCarousel";
export { ContentGrid } from "./common/ContentGrid";
export {
  Skeleton,
  MovieCardSkeleton,
  DetailPageSkeleton,
  SearchResultSkeleton,
  HeroSkeleton,
  SplitScreenHeroSkeleton,
  MobileHeroCardSkeleton,
} from "./common/Skeleton";

// Debug components
export { ApiTester } from "./debug/ApiTester";
export { CacheDebug } from "./debug/CacheDebug";
export { DebugModal } from "./debug/DebugModal";
export { DataDebugger } from "./debug/DataDebugger";

// Provider components
export { GlobalDataProvider } from "./providers/GlobalDataProvider";
