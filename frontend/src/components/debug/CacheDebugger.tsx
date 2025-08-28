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

export function CacheDebugger() {
  const [stats, setStats] = useState<CacheStats>({ totalItems: 0, totalSize: "0 KB" });
  const [isVisible, setIsVisible] = useState(false);

  const refreshStats = () => {
    setStats(getCacheStats());
  };

  const handleClearCache = () => {
    clearCache();
    refreshStats();
  };

  useEffect(() => {
    refreshStats();
  }, []);

  // Only show in development
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isVisible ? (
        <Button
          onClick={() => setIsVisible(true)}
          variant="outline"
          size="sm"
          className="bg-gray-900 text-white border-gray-700 hover:bg-gray-800"
        >
          Cache Debug
        </Button>
      ) : (
        <Card className="w-80 bg-gray-900 text-white border-gray-700">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Frontend Cache Stats</CardTitle>
              <Button
                onClick={() => setIsVisible(false)}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                ×
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-400">Items:</span>
                <div className="font-mono">{stats.totalItems}</div>
              </div>
              <div>
                <span className="text-gray-400">Size:</span>
                <div className="font-mono">{stats.totalSize}</div>
              </div>
            </div>

            {stats.oldestItem && (
              <div className="text-xs">
                <span className="text-gray-400">Oldest:</span>
                <div className="font-mono text-xs truncate">{stats.oldestItem}</div>
              </div>
            )}

            {stats.newestItem && (
              <div className="text-xs">
                <span className="text-gray-400">Newest:</span>
                <div className="font-mono text-xs truncate">{stats.newestItem}</div>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button
                onClick={refreshStats}
                variant="outline"
                size="sm"
                className="flex-1 text-xs border-gray-600 hover:bg-gray-800"
              >
                Refresh
              </Button>
              <Button onClick={handleClearCache} variant="destructive" size="sm" className="flex-1 text-xs">
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
