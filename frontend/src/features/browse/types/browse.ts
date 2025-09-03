// ============================================================================
// BROWSE FEATURE TYPES
// ============================================================================

// Simple types for listing data in browse
export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  backdrop_path?: string;
}

export interface Series {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  poster_path: string;
  backdrop_path?: string;
}

// Browse content hook props
export interface UseBrowseContentProps {
  endpoint: string;
  enabled?: boolean;
  pageSize?: number;
}
