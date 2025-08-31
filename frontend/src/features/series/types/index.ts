// ============================================================================
// SERIES FEATURE TYPES
// ============================================================================

export interface SeriesDetailProps {
  id: string;
  data: SeriesDetails | null;
  loading: boolean;
  error: string | null;
}

export interface SeriesDetails {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  last_air_date: string;
  status: string;
  number_of_seasons: number;
  number_of_episodes: number;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  backdrop_path: string;
  homepage: string;
  genres: Array<{ id: number; name: string }>;
  networks: Array<{ id: number; name: string; logo_path?: string }>;
  production_companies: Array<{ id: number; name: string; logo_path?: string }>;
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
