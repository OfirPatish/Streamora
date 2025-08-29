"use client";

import { getGlobalDataState } from "@/hooks/useGlobalData";

interface GlobalDataDebuggerProps {
  refreshKey?: number;
}

export function GlobalDataDebugger({ refreshKey }: GlobalDataDebuggerProps) {
  // Just read the current state without any subscriptions or re-renders
  const { data, loading, error, isInitialized } = getGlobalDataState();

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const dataCounts = {
    movies: {
      popular: data.popularMovies?.results?.length || 0,
      topRated: data.topRatedMovies?.results?.length || 0,
      nowPlaying: data.nowPlayingMovies?.results?.length || 0,
      upcoming: data.upcomingMovies?.results?.length || 0,
    },
    series: {
      popular: data.popularSeries?.results?.length || 0,
      topRated: data.topRatedSeries?.results?.length || 0,
      onTheAir: data.onTheAirSeries?.results?.length || 0,
      airingToday: data.airingTodaySeries?.results?.length || 0,
    },
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs">
        <span>Status:</span>
        <span className={loading ? "text-yellow-400" : isInitialized ? "text-green-400" : "text-red-400"}>
          {loading ? "Loading..." : isInitialized ? "Ready" : "Not Init"}
        </span>
      </div>

      {error && <div className="text-red-400 text-xs">Error: {error}</div>}

      <div className="border-t border-gray-700 pt-1">
        <div className="font-semibold text-blue-400 text-xs mb-1">Movies:</div>
        <div className="grid grid-cols-2 gap-1 text-xs">
          <span>Popular: {dataCounts.movies.popular}</span>
          <span>Top: {dataCounts.movies.topRated}</span>
          <span>Now: {dataCounts.movies.nowPlaying}</span>
          <span>Upcoming: {dataCounts.movies.upcoming}</span>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-1">
        <div className="font-semibold text-purple-400 text-xs mb-1">Series:</div>
        <div className="grid grid-cols-2 gap-1 text-xs">
          <span>Popular: {dataCounts.series.popular}</span>
          <span>Top: {dataCounts.series.topRated}</span>
          <span>On Air: {dataCounts.series.onTheAir}</span>
          <span>Today: {dataCounts.series.airingToday}</span>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-1 text-xs text-gray-400">
        Calls: {isInitialized ? "8 (once)" : "0"}
      </div>
    </div>
  );
}
