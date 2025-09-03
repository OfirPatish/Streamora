// ============================================================================
// SERIES FEATURE TYPES
// ============================================================================

export interface Series {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_name: string;
  origin_country: string[];
}

export interface SeriesDetail extends Series {
  number_of_seasons: number;
  number_of_episodes: number;
  status: string;
  tagline: string;
  type: string;
  in_production: boolean;
  last_air_date: string;
  next_episode_to_air?: Episode;
  genres: Genre[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  networks: Network[];
  seasons: Season[];
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  air_date: string;
  episode_number: number;
  season_number: number;
  still_path?: string;
  vote_average: number;
  vote_count: number;
}

export interface Season {
  id: number;
  name: string;
  overview: string;
  air_date: string;
  season_number: number;
  poster_path?: string;
  episode_count: number;
}

export interface Network {
  id: number;
  name: string;
  logo_path?: string;
  origin_country: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path?: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
