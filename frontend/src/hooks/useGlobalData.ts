"use client";

import { useState, useEffect } from "react";
import { PaginatedResponse } from "@/lib/api";
import { Movie } from "@/components/features/movies/hooks/useMovies";
import { Series } from "@/components/features/series/hooks/useSeries";

// Global data interface
interface GlobalData {
  // Movies
  popularMovies: PaginatedResponse<Movie> | null;
  topRatedMovies: PaginatedResponse<Movie> | null;
  nowPlayingMovies: PaginatedResponse<Movie> | null;
  upcomingMovies: PaginatedResponse<Movie> | null;

  // Series
  popularSeries: PaginatedResponse<Series> | null;
  topRatedSeries: PaginatedResponse<Series> | null;
  onTheAirSeries: PaginatedResponse<Series> | null;
  airingTodaySeries: PaginatedResponse<Series> | null;
}

interface GlobalDataState {
  data: GlobalData;
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
}

// Singleton to store global data
let globalDataState: GlobalDataState = {
  data: {
    popularMovies: null,
    topRatedMovies: null,
    nowPlayingMovies: null,
    upcomingMovies: null,
    popularSeries: null,
    topRatedSeries: null,
    onTheAirSeries: null,
    airingTodaySeries: null,
  },
  loading: false,
  error: null,
  isInitialized: false,
};

// Flag to prevent multiple simultaneous fetches
let isFetching = false;

// Subscribers for state updates
let subscribers: Set<(state: GlobalDataState) => void> = new Set();

// Notify all subscribers
function notifySubscribers() {
  subscribers.forEach((callback) => callback(globalDataState));
}

// Update global state
function updateGlobalState(updates: Partial<GlobalDataState>) {
  globalDataState = { ...globalDataState, ...updates };
  notifySubscribers();
}

// Fetch all data once
async function fetchAllData() {
  if (globalDataState.isInitialized || isFetching) return;

  console.log("🌐 Global Data: Starting to fetch all data...");
  isFetching = true;
  updateGlobalState({ loading: true, error: null });

  try {
    const apiClient = (await import("@/lib/api")).apiClient;

    // Fetch all data in parallel
    const [
      popularMovies,
      topRatedMovies,
      nowPlayingMovies,
      upcomingMovies,
      popularSeries,
      topRatedSeries,
      onTheAirSeries,
      airingTodaySeries,
    ] = await Promise.all([
      apiClient.get<PaginatedResponse<Movie>>("/movies/popular"),
      apiClient.get<PaginatedResponse<Movie>>("/movies/top-rated"),
      apiClient.get<PaginatedResponse<Movie>>("/movies/now-playing"),
      apiClient.get<PaginatedResponse<Movie>>("/movies/upcoming"),
      apiClient.get<PaginatedResponse<Series>>("/series/popular"),
      apiClient.get<PaginatedResponse<Series>>("/series/top-rated"),
      apiClient.get<PaginatedResponse<Series>>("/series/on-the-air"),
      apiClient.get<PaginatedResponse<Series>>("/series/airing-today"),
    ]);

    console.log("✅ Global Data: All data fetched successfully", {
      popularMovies: popularMovies?.results?.length || 0,
      topRatedMovies: topRatedMovies?.results?.length || 0,
      popularSeries: popularSeries?.results?.length || 0,
      topRatedSeries: topRatedSeries?.results?.length || 0,
    });

    updateGlobalState({
      data: {
        popularMovies,
        topRatedMovies,
        nowPlayingMovies,
        upcomingMovies,
        popularSeries,
        topRatedSeries,
        onTheAirSeries,
        airingTodaySeries,
      },
      loading: false,
      isInitialized: true,
    });
  } catch (error) {
    console.error("❌ Global Data: Error fetching data", error);
    updateGlobalState({
      loading: false,
      error: error instanceof Error ? error.message : "Failed to fetch data",
    });
  } finally {
    isFetching = false;
  }
}

// Hook to access global data
export function useGlobalData() {
  const [state, setState] = useState<GlobalDataState>(globalDataState);

  useEffect(() => {
    // Subscribe to updates
    subscribers.add(setState);

    // Fetch data if not initialized
    if (!globalDataState.isInitialized) {
      fetchAllData();
    }

    // Listen for refresh events
    const handleRefresh = () => {
      refreshGlobalData();
    };
    window.addEventListener("refreshGlobalData", handleRefresh);

    // Cleanup subscription and event listener
    return () => {
      subscribers.delete(setState);
      window.removeEventListener("refreshGlobalData", handleRefresh);
    };
  }, []);

  return state;
}

// Utility hooks for specific data
export function usePopularMovies() {
  const { data, loading, error } = useGlobalData();
  return { data: data.popularMovies, loading, error };
}

export function useTopRatedMovies() {
  const { data, loading, error } = useGlobalData();
  return { data: data.topRatedMovies, loading, error };
}

export function useNowPlayingMovies() {
  const { data, loading, error } = useGlobalData();
  return { data: data.nowPlayingMovies, loading, error };
}

export function useUpcomingMovies() {
  const { data, loading, error } = useGlobalData();
  return { data: data.upcomingMovies, loading, error };
}

export function usePopularSeries() {
  const { data, loading, error } = useGlobalData();
  return { data: data.popularSeries, loading, error };
}

export function useTopRatedSeries() {
  const { data, loading, error } = useGlobalData();
  return { data: data.topRatedSeries, loading, error };
}

export function useOnTheAirSeries() {
  const { data, loading, error } = useGlobalData();
  return { data: data.onTheAirSeries, loading, error };
}

export function useAiringTodaySeries() {
  const { data, loading, error } = useGlobalData();
  return { data: data.airingTodaySeries, loading, error };
}

// Force refresh function
export function refreshGlobalData() {
  globalDataState.isInitialized = false;
  isFetching = false; // Reset the fetching flag to allow a new fetch
  fetchAllData();
}

// Read-only state getter for debuggers (doesn't trigger fetches)
export function getGlobalDataState() {
  return globalDataState;
}
