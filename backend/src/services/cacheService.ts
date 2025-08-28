import { createClient, RedisClientType } from "redis";

interface CacheConfig {
  host?: string;
  port?: number;
  password?: string;
  defaultTTL?: number;
}

class CacheService {
  private client: RedisClientType | null = null;
  private defaultTTL: number;
  private isConnected: boolean = false;

  constructor(config: CacheConfig = {}) {
    this.defaultTTL = config.defaultTTL || 3600; // 1 hour default
    this.initializeClient(config);
  }

  private async initializeClient(config: CacheConfig) {
    try {
      // Use Redis URL from environment or fallback to local
      const redisUrl = process.env.REDIS_URL || `redis://${config.host || "localhost"}:${config.port || 6379}`;

      this.client = createClient({
        url: redisUrl,
        password: config.password || process.env.REDIS_PASSWORD,
        socket: {
          reconnectStrategy: (retries) => {
            // Stop retrying after 3 attempts to reduce log noise
            if (retries > 3) return false;
            return Math.min(retries * 50, 1000);
          },
        },
      });

      this.client.on("error", (err) => {
        // Only log once, not on every retry
        if (this.isConnected) {
          console.warn("⚠️ Redis connection lost, falling back to in-memory cache");
        }
        this.isConnected = false;
      });

      this.client.on("connect", () => {
        console.log("✅ Redis connected successfully");
        this.isConnected = true;
      });

      this.client.on("disconnect", () => {
        console.log("🔌 Redis disconnected");
        this.isConnected = false;
      });

      await this.client.connect();
    } catch (error) {
      console.warn("⚠️ Redis not available, using in-memory cache (this is fine for development)");
      this.client = null;
      this.isConnected = false;
    }
  }

  /**
   * Get cached data
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      if (!this.client || !this.isConnected) {
        return null;
      }

      const cached = await this.client.get(key);
      if (!cached) return null;

      return JSON.parse(cached) as T;
    } catch (error) {
      console.error("Cache get error:", error);
      return null;
    }
  }

  /**
   * Set cached data with TTL
   */
  async set(key: string, data: any, ttl?: number): Promise<boolean> {
    try {
      if (!this.client || !this.isConnected) {
        return false;
      }

      const serialized = JSON.stringify(data);
      const expireTime = ttl || this.defaultTTL;

      await this.client.setEx(key, expireTime, serialized);
      return true;
    } catch (error) {
      console.error("Cache set error:", error);
      return false;
    }
  }

  /**
   * Delete cached data
   */
  async delete(key: string): Promise<boolean> {
    try {
      if (!this.client || !this.isConnected) {
        return false;
      }

      const result = await this.client.del(key);
      return result > 0;
    } catch (error) {
      console.error("Cache delete error:", error);
      return false;
    }
  }

  /**
   * Check if key exists
   */
  async exists(key: string): Promise<boolean> {
    try {
      if (!this.client || !this.isConnected) {
        return false;
      }

      const result = await this.client.exists(key);
      return result === 1;
    } catch (error) {
      console.error("Cache exists error:", error);
      return false;
    }
  }

  /**
   * Clear all cache (use with caution!)
   */
  async clear(): Promise<boolean> {
    try {
      if (!this.client || !this.isConnected) {
        return false;
      }

      await this.client.flushAll();
      return true;
    } catch (error) {
      console.error("Cache clear error:", error);
      return false;
    }
  }

  /**
   * Get cache statistics
   */
  async getStats(): Promise<{ connected: boolean; keyCount?: number }> {
    try {
      if (!this.client || !this.isConnected) {
        return { connected: false };
      }

      const info = await this.client.info("keyspace");
      const keyCount = this.parseKeyCount(info);

      return {
        connected: true,
        keyCount,
      };
    } catch (error) {
      console.error("Cache stats error:", error);
      return { connected: false };
    }
  }

  private parseKeyCount(info: string): number {
    const match = info.match(/keys=(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  /**
   * Close Redis connection
   */
  async disconnect(): Promise<void> {
    if (this.client && this.isConnected) {
      await this.client.disconnect();
      this.isConnected = false;
    }
  }
}

// Cache TTL constants for different data types
export const CACHE_TTL = {
  TRENDING: 30 * 60, // 30 minutes (changes frequently)
  POPULAR: 2 * 60 * 60, // 2 hours (relatively stable)
  TOP_RATED: 6 * 60 * 60, // 6 hours (very stable)
  MOVIE_DETAILS: 24 * 60 * 60, // 24 hours (rarely changes)
  SEARCH: 10 * 60, // 10 minutes (user-specific, shorter cache)
  GENRES: 7 * 24 * 60 * 60, // 7 days (almost never changes)
} as const;

// Export singleton instance
export const cacheService = new CacheService({
  defaultTTL: CACHE_TTL.POPULAR,
});

export default CacheService;
