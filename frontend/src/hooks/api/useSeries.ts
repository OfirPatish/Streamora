"use client";

import { useApi, useAsyncApi } from "@/hooks/api/useApi";
import { PaginatedResponse } from "@/lib/api";

// Series Types (matching backend API structure)
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

export interface SeriesDetails extends Series {
  episode_run_time: number[];
  status: string;
  tagline: string;
  type: string;
  genres: Array<{ id: number; name: string }>;
  production_companies: Array<{
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  spoken_languages: Array<{
    iso_639_1: string;
    name: string;
  }>;
  homepage: string;
  number_of_seasons: number;
  number_of_episodes: number;
  last_air_date: string;
  networks: Array<{
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }>;
  seasons: Array<{
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    air_date: string;
    episode_count: number;
  }>;
  credits?: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
      profile_path: string | null;
    }>;
  };
  videos?: {
    results: Array<{
      key: string;
      name: string;
      type: string;
      site: string;
    }>;
  };
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  season_number: number;
  air_date: string | null;
  runtime: number;
  vote_average: number;
  still_path: string | null;
  crew: Array<{
    id: number;
    name: string;
    job: string;
  }>;
  guest_stars: Array<{
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }>;
}

// Series List Hooks
export function usePopularSeries(page: number = 1) {
  return useApi<PaginatedResponse<Series>>("/series/popular", { page });
}

export function useTopRatedSeries(page: number = 1) {
  return useApi<PaginatedResponse<Series>>("/series/top-rated", { page });
}

export function useOnTheAirSeries(page: number = 1) {
  return useApi<PaginatedResponse<Series>>("/series/on-the-air", { page });
}

export function useAiringTodaySeries(page: number = 1) {
  return useApi<PaginatedResponse<Series>>("/series/airing-today", { page });
}

// Series Detail Hook
export function useSeriesDetails(id: number | string, immediate: boolean = true) {
  return useApi<SeriesDetails>(`/series/${id}`, undefined, immediate);
}

// Series Credits Hook
export function useSeriesCredits(id: number | string) {
  return useApi<SeriesDetails["credits"]>(`/series/${id}/credits`);
}

// Series Videos Hook
export function useSeriesVideos(id: number | string) {
  return useApi<SeriesDetails["videos"]>(`/series/${id}/videos`);
}

// Season Details Hook
export function useSeasonDetails(seriesId: number | string, seasonNumber: number) {
  return useApi<{
    id: number;
    name: string;
    overview: string;
    season_number: number;
    episodes: Episode[];
  }>(`/series/${seriesId}/season/${seasonNumber}`);
}

// Episode Details Hook
export function useEpisodeDetails(seriesId: number | string, seasonNumber: number, episodeNumber: number) {
  return useApi<Episode>(`/series/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}`);
}

// Manual series search hook
export function useSeriesSearch() {
  return useAsyncApi<PaginatedResponse<Series>>();
}
