"use client";

import { useApi, useAsyncApi } from "./useApi";
import { PaginatedResponse } from "@/lib/api";

// Series Types (matching backend API structure)
export interface Series {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  last_air_date?: string;
  number_of_seasons: number;
  number_of_episodes: number;
  vote_average: number;
  vote_count: number;
  poster_path: string | null;
  backdrop_path: string | null;
  genres?: Array<{ id: number; name: string }>;
  production_companies?: Array<{
    id: number;
    name: string;
    logo_path: string | null;
  }>;
  seasons?: Array<{
    id: number;
    name: string;
    season_number: number;
    episode_count: number;
    air_date: string | null;
    poster_path: string | null;
    overview: string;
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
  return useApi<Series>(`/series/${id}`, undefined, immediate);
}

// Series Credits Hook
export function useSeriesCredits(id: number | string) {
  return useApi<Series["credits"]>(`/series/${id}/credits`);
}

// Series Videos Hook
export function useSeriesVideos(id: number | string) {
  return useApi<Series["videos"]>(`/series/${id}/videos`);
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
