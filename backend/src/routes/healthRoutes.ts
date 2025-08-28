import { Router } from "express";
import { cacheService } from "../services/cacheService";

const router = Router();

/**
 * @route GET /api/health
 * @desc Health check endpoint with cache status
 */
router.get("/", async (req, res) => {
  try {
    const cacheStats = await cacheService.getStats();

    res.json({
      status: "OK",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      cache: {
        connected: cacheStats.connected,
        keyCount: cacheStats.keyCount || 0,
        type: cacheStats.connected ? "Redis" : "In-Memory Fallback",
      },
      memory: {
        used: Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100,
        total: Math.round((process.memoryUsage().heapTotal / 1024 / 1024) * 100) / 100,
        unit: "MB",
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Health check failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * @route POST /api/health/cache/clear
 * @desc Clear all cache (development only)
 */
router.post("/cache/clear", async (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({
      error: "Cache clearing is not allowed in production",
    });
  }

  try {
    const cleared = await cacheService.clear();
    res.json({
      success: cleared,
      message: cleared ? "Cache cleared successfully" : "Cache clear failed or not connected",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to clear cache",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
