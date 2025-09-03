// ============================================================================
// BROWSE LAYOUT TYPES
// ============================================================================

export interface GridProps {
  nowPlayingMovies: any[];
  topRatedMovies: any[];
  onTheAirSeries: any[];
  topRatedSeries: any[];
  loading: boolean;
  error: string | null;
}

export interface BannerProps {
  featuredContent: any[];
  topMovie: any | null;
  topSeries: any | null;
  loading: boolean;
  error: string | null;
}
