// Main components index - export all components

// Section components
export { HomeContent } from "./sections/home";
export {
  MovieDetail,
  SeriesDetail,
  MoviesContent,
  SeriesContent,
  DetailBanner,
  DetailCast,
  DetailInfo,
  DetailProduction,
} from "./sections/shared";
export { SearchResults, SearchSuggestions } from "./sections/search";

// Form components
export { SearchFilters } from "./sections/search";

// Modal components
export { VideoModal } from "./sections/shared";

// Layout components
export { DesktopHeader } from "./layout/DesktopHeader";
export { MobileHeader } from "./layout/MobileHeader";
export { MobileBottomNav } from "./layout/MobileBottomNav";
export { PageTemplate } from "./layout/PageTemplate";
export { ContentSection } from "./layout/PageContentWrapper";

// Card components
export { ContentCard, ContentGrid, ContentCarousel } from "./sections/shared";

// UI components
export { Skeleton, ContentCardSkeleton, DetailPageSkeleton, SearchResultSkeleton } from "./ui/skeletons/Skeleton";

// Provider components
export { QueryProvider } from "./providers/QueryProvider";
