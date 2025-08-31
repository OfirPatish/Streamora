/**
 * Frontend Cache Service
 * Implements localStorage-based caching with TTL (Time To Live) support
 * to reduce API calls and avoid rate limiting
 */

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in seconds
}

interface CacheStats {
  totalItems: number;
  totalSize: string;
  oldestItem?: string;
  newestItem?: string;
}

class FrontendCacheService {
  private keyPrefix = "streamora_cache_";
  private maxItems = 100; // Maximum number of cached items
  private maxAge = 7 * 24 * 60 * 60; // Maximum age in seconds (7 days)

  /**
   * Generate a cache key from endpoint and parameters
   */
  private generateCacheKey(endpoint: string, params?: Record<string, any>): string {
    const paramString = params ? JSON.stringify(params) : "";
    return `${this.keyPrefix}${endpoint}${paramString}`;
  }

  /**
   * Check if we're in a browser environment
   */
  private isBrowser(): boolean {
    return typeof window !== "undefined" && typeof localStorage !== "undefined";
  }

  /**
   * Get data from cache
   */
  get<T>(endpoint: string, params?: Record<string, any>): T | null {
    if (!this.isBrowser()) return null;

    try {
      const key = this.generateCacheKey(endpoint, params);
      const cached = localStorage.getItem(key);

      if (!cached) return null;

      const item: CacheItem<T> = JSON.parse(cached);
      const now = Date.now() / 1000; // Convert to seconds

      // Check if item has expired
      if (now - item.timestamp > item.ttl) {
        localStorage.removeItem(key);
        return null;
      }

      return item.data;
    } catch (error) {
      console.warn("Cache get error:", error);
      return null;
    }
  }

  /**
   * Store data in cache
   */
  set<T>(endpoint: string, data: T, ttl: number = 3600, params?: Record<string, any>): boolean {
    if (!this.isBrowser()) return false;

    try {
      // Clean up old items before adding new ones
      this.cleanup();

      const key = this.generateCacheKey(endpoint, params);
      const item: CacheItem<T> = {
        data,
        timestamp: Date.now() / 1000,
        ttl,
      };

      localStorage.setItem(key, JSON.stringify(item));
      return true;
    } catch (error) {
      console.warn("Cache set error:", error);
      // If localStorage is full, try to clear some space
      this.cleanup(true);
      try {
        const key = this.generateCacheKey(endpoint, params);
        const item: CacheItem<T> = {
          data,
          timestamp: Date.now() / 1000,
          ttl,
        };
        localStorage.setItem(key, JSON.stringify(item));
        return true;
      } catch (retryError) {
        console.error("Cache set retry failed:", retryError);
        return false;
      }
    }
  }

  /**
   * Check if data exists and is valid in cache
   */
  has(endpoint: string, params?: Record<string, any>): boolean {
    return this.get(endpoint, params) !== null;
  }

  /**
   * Remove specific item from cache
   */
  delete(endpoint: string, params?: Record<string, any>): boolean {
    if (!this.isBrowser()) return false;

    try {
      const key = this.generateCacheKey(endpoint, params);
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn("Cache delete error:", error);
      return false;
    }
  }

  /**
   * Clear all cache items
   */
  clear(): boolean {
    if (!this.isBrowser()) return false;

    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith(this.keyPrefix)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      console.error("Cache clear error:", error);
      return false;
    }
  }

  /**
   * Clean up expired and old items
   */
  private cleanup(aggressive: boolean = false): void {
    if (!this.isBrowser()) return;

    try {
      const keys = Object.keys(localStorage);
      const cacheKeys = keys.filter((key) => key.startsWith(this.keyPrefix));
      const now = Date.now() / 1000;

      // Remove expired items
      cacheKeys.forEach((key) => {
        try {
          const cached = localStorage.getItem(key);
          if (cached) {
            const item: CacheItem<any> = JSON.parse(cached);
            if (now - item.timestamp > item.ttl || now - item.timestamp > this.maxAge) {
              localStorage.removeItem(key);
            }
          }
        } catch (error) {
          // Remove corrupted items
          localStorage.removeItem(key);
        }
      });

      // If aggressive cleanup is needed, remove oldest items
      if (aggressive) {
        const remainingKeys = Object.keys(localStorage).filter((key) => key.startsWith(this.keyPrefix));

        if (remainingKeys.length > this.maxItems) {
          const itemsWithTime = remainingKeys
            .map((key) => {
              try {
                const cached = localStorage.getItem(key);
                const item: CacheItem<any> = cached ? JSON.parse(cached) : null;
                return { key, timestamp: item?.timestamp || 0 };
              } catch {
                return { key, timestamp: 0 };
              }
            })
            .sort((a, b) => a.timestamp - b.timestamp);

          // Remove oldest items
          const itemsToRemove = itemsWithTime.slice(0, remainingKeys.length - this.maxItems + 10);
          itemsToRemove.forEach((item) => localStorage.removeItem(item.key));
        }
      }
    } catch (error) {
      console.error("Cache cleanup error:", error);
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    if (!this.isBrowser()) {
      return { totalItems: 0, totalSize: "0 KB" };
    }

    try {
      const keys = Object.keys(localStorage);
      const cacheKeys = keys.filter((key) => key.startsWith(this.keyPrefix));

      let totalSize = 0;
      let oldestTimestamp = Infinity;
      let newestTimestamp = 0;
      let oldestItem = "";
      let newestItem = "";

      cacheKeys.forEach((key) => {
        try {
          const value = localStorage.getItem(key) || "";
          totalSize += key.length + value.length;

          const cached = JSON.parse(value);
          if (cached.timestamp < oldestTimestamp) {
            oldestTimestamp = cached.timestamp;
            oldestItem = key.replace(this.keyPrefix, "");
          }
          if (cached.timestamp > newestTimestamp) {
            newestTimestamp = cached.timestamp;
            newestItem = key.replace(this.keyPrefix, "");
          }
        } catch (error) {
          // Skip corrupted items
        }
      });

      return {
        totalItems: cacheKeys.length,
        totalSize: `${(totalSize / 1024).toFixed(2)} KB`,
        oldestItem: oldestItem || undefined,
        newestItem: newestItem || undefined,
      };
    } catch (error) {
      console.error("Cache stats error:", error);
      return { totalItems: 0, totalSize: "0 KB" };
    }
  }
}

// Cache TTL constants (in seconds) - now using centralized constants
import { getCacheTimes } from "./constants";

// Helper function to convert milliseconds to seconds
const msToSeconds = (ms: number) => Math.floor(ms / 1000);

export const CACHE_TTL = {
  TRENDING: 30 * 60, // 30 minutes
  POPULAR: msToSeconds(getCacheTimes("/movies/popular").staleTime),
  TOP_RATED: msToSeconds(getCacheTimes("/movies/top-rated").staleTime),
  NOW_PLAYING: msToSeconds(getCacheTimes("/movies/now-playing").staleTime),
  UPCOMING: msToSeconds(getCacheTimes("/movies/upcoming").staleTime),
  MOVIE_DETAILS: 24 * 60 * 60, // 24 hours
  SERIES_DETAILS: 24 * 60 * 60, // 24 hours
  SEARCH: 10 * 60, // 10 minutes
  GENRES: 7 * 24 * 60 * 60, // 7 days
} as const;

// Export singleton instance
export const frontendCache = new FrontendCacheService();

// Export utility functions
export const clearCache = () => frontendCache.clear();
export const getCacheStats = () => frontendCache.getStats();
