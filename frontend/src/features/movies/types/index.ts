// ============================================================================
// MOVIES FEATURE TYPES
// ============================================================================

export interface MovieDetailProps {
  id: string;
  data: MovieDetails | null;
  loading: boolean;
  error: string | null;
}

export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  runtime: number;
  status: string;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  backdrop_path: string;
  homepage: string;
  genres: Array<{ id: number; name: string }>;
  production_companies: Array<{ id: number; name: string; logo_path?: string }>;
  budget: number;
  revenue: number;
  original_language: string;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  spoken_languages: Array<{ iso_639_1: string; name: string }>;
  credits?: {
    cast: Array<{ id: number; name: string; character: string; profile_path?: string }>;
    crew: Array<{ id: number; name: string; job: string }>;
  };
  videos?: {
    results: Array<{ key: string; name: string; site: string; type: string }>;
  };
}

export interface Video {
  key: string;
  name: string;
  site: string;
  type: string;
}
