// ============================================================================
// BROWSE CONTENT DISPLAY TYPES
// ============================================================================

export interface MediaCardProps {
  id: number;
  title: string;
  year: string;
  genre: string;
  type: "movie" | "series";
  index: number;
  rating?: number;
  isNew?: boolean;
  posterPath?: string | null;
  priority?: boolean;
  description?: string;
  // Display options
  showViewCount?: boolean;
  showDuration?: boolean;
  showReleaseDate?: boolean;
  showRating?: boolean;
  showEpisodeCount?: boolean;
  // Data for display
  viewCount?: number;
  duration?: string;
  releaseDate?: string;
  episodeCount?: number;
}

export interface ContentItem {
  id: number;
  title: string;
  year: string;
  genre: string;
  type: "movie" | "series";
  index: number;
  rating?: number;
  isNew?: boolean;
  posterPath?: string | null;
  // Additional display data
  viewCount?: number;
  duration?: string;
  releaseDate?: string;
  episodeCount?: number;
}

export interface DisplayProps {
  title?: string;
  items: ContentItem[];
  layout?: "grid" | "carousel";
  showViewAll?: boolean;
  viewAllUrl?: string;
  loading?: boolean;
  error?: string | null;
  // Display options
  showViewCount?: boolean;
  showDuration?: boolean;
  showReleaseDate?: boolean;
  showRating?: boolean;
  showEpisodeCount?: boolean;
  // Pagination support (for grid layout)
  enablePagination?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loadingMore?: boolean;
}
