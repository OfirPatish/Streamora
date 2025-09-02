// ============================================================================
// MOVIES FEATURE TYPES
// ============================================================================

import { ReactNode } from "react";

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
  vote_average: number;
  backdrop_path: string;
  genres: Array<{ id: number; name: string }>;
  spoken_languages: Array<{ iso_639_1: string; name: string }>;
  // Additional properties from backend
  runtime?: number;
  status?: string;
  tagline?: string;
  budget?: number;
  revenue?: number;
  production_companies?: Array<{
    id: number;
    name: string;
    logo_path?: string;
  }>;
  production_countries?: Array<{ iso_3166_1: string; name: string }>;
  homepage?: string;
  imdb_id?: string;
  credits?: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path?: string;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
      profile_path?: string | null;
    }>;
  };
  videos?: {
    results: Array<{ key: string; name: string; site: string; type: string }>;
  };
  images?: {
    backdrops: Array<{ file_path: string; width: number; height: number }>;
    posters: Array<{ file_path: string; width: number; height: number }>;
  };
  recommendations?: {
    page: number;
    results: Array<{
      id: number;
      title: string;
      poster_path: string;
      vote_average: number;
    }>;
    total_pages: number;
    total_results: number;
  };
}

// ============================================================================
// MOVIE DETAIL LAYOUT TYPES
// ============================================================================

export interface MovieDetailLayoutProps {
  title: string;
  overview?: string;
  backdropPath?: string | null;
  videos?: Array<{ key: string; name: string; type: string; site: string }>;
  onVideoSelect?: (video: {
    key: string;
    name: string;
    type: string;
    site: string;
  }) => void;
  onWatchlistAdd?: () => void;
  children: ReactNode;
  // Movie metadata
  releaseYear?: string;
  languages?: string[];
  selectedLanguage?: string;
  onLanguageSelect?: (language: string) => void;
  imdbRating?: number;
  streamoraRating?: number;
  genres?: Array<{ id: number; name: string }>;
  director?: MoviePerson;
  music?: MoviePerson;
}

export interface MoviePerson {
  name: string;
  origin: string;
  profilePath?: string | null;
}

export interface CastMember {
  id: number;
  name: string;
  character?: string;
  profile_path?: string | null;
}

export interface MovieCastListProps {
  cast: CastMember[];
  maxItems?: number;
}
