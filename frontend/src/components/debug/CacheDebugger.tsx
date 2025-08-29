"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCacheStats, clearCache } from "@/lib/cache";

interface CacheStats {
  totalItems: number;
  totalSize: string;
  oldestItem?: string;
  newestItem?: string;
}

interface CacheDebuggerProps {
  refreshKey?: number;
}

export function CacheDebugger({ refreshKey }: CacheDebuggerProps) {
  const [stats, setStats] = useState<CacheStats>({ totalItems: 0, totalSize: "0 KB" });

  const refreshStats = () => {
    setStats(getCacheStats());
  };

  const handleClearCache = () => {
    clearCache();
    refreshStats();
  };

  useEffect(() => {
    refreshStats();
  }, [refreshKey]);

  // Only show in development
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <div className="text-center">
          <div className="text-lg font-bold text-blue-400">{stats.totalItems}</div>
          <div className="text-xs text-gray-400">Items</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-400">{stats.totalSize}</div>
          <div className="text-xs text-gray-400">Size</div>
        </div>
      </div>

      {stats.oldestItem && (
        <div className="text-xs">
          <span className="text-gray-400">Oldest:</span>
          <div className="font-mono text-xs truncate bg-gray-700 px-1 py-0.5 rounded mt-1">{stats.oldestItem}</div>
        </div>
      )}

      {stats.newestItem && (
        <div className="text-xs">
          <span className="text-gray-400">Newest:</span>
          <div className="font-mono text-xs truncate bg-gray-700 px-1 py-0.5 rounded mt-1">{stats.newestItem}</div>
        </div>
      )}
    </div>
  );
}
