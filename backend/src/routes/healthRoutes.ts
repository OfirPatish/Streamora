import { Router } from "express";

const router = Router();

/**
 * @route GET /api/health
 * @desc Health check endpoint
 */
router.get("/", async (req, res) => {
  try {
    res.json({
      status: "OK",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
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

export default router;
