import { Router, Request, Response } from "express";
import { tmdbService } from "../services/tmdbService";
import { ApiResponse } from "../types";

const router = Router();

// Get popular series
router.get("/popular", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const series = await tmdbService.getPopularSeries(page);

    const response: ApiResponse<typeof series> = {
      success: true,
      data: series,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Failed to fetch popular series",
      },
      timestamp: new Date().toISOString(),
    });
  }
});

// Get top rated series
router.get("/top-rated", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const series = await tmdbService.getTopRatedSeries(page);

    const response: ApiResponse<typeof series> = {
      success: true,
      data: series,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Failed to fetch top rated series",
      },
      timestamp: new Date().toISOString(),
    });
  }
});

// Get on the air series
router.get("/on-the-air", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const series = await tmdbService.getOnTheAirSeries(page);

    const response: ApiResponse<typeof series> = {
      success: true,
      data: series,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Failed to fetch on the air series",
      },
      timestamp: new Date().toISOString(),
    });
  }
});

// Get airing today series
router.get("/airing-today", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const series = await tmdbService.getAiringTodaySeries(page);

    const response: ApiResponse<typeof series> = {
      success: true,
      data: series,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Failed to fetch airing today series",
      },
      timestamp: new Date().toISOString(),
    });
  }
});

// Get series details by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const seriesId = parseInt(req.params.id);

    if (isNaN(seriesId)) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Invalid series ID",
        },
        timestamp: new Date().toISOString(),
      });
    }

    const series = await tmdbService.getSeriesDetails(seriesId);

    const response: ApiResponse<typeof series> = {
      success: true,
      data: series,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Failed to fetch series details",
      },
      timestamp: new Date().toISOString(),
    });
  }
});

// Get series recommendations
router.get("/:id/recommendations", async (req: Request, res: Response) => {
  try {
    const seriesId = parseInt(req.params.id);
    const page = parseInt(req.query.page as string) || 1;

    if (isNaN(seriesId)) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Invalid series ID",
        },
        timestamp: new Date().toISOString(),
      });
    }

    const recommendations = await tmdbService.getSeriesRecommendations(seriesId, page);

    const response: ApiResponse<typeof recommendations> = {
      success: true,
      data: recommendations,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Failed to fetch series recommendations",
      },
      timestamp: new Date().toISOString(),
    });
  }
});

// Get season details
router.get("/:id/seasons/:num", async (req: Request, res: Response) => {
  try {
    const seriesId = parseInt(req.params.id);
    const seasonNumber = parseInt(req.params.num);

    if (isNaN(seriesId) || isNaN(seasonNumber)) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Invalid series ID or season number",
        },
        timestamp: new Date().toISOString(),
      });
    }

    const season = await tmdbService.getSeasonDetails(seriesId, seasonNumber);

    const response: ApiResponse<typeof season> = {
      success: true,
      data: season,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Failed to fetch season details",
      },
      timestamp: new Date().toISOString(),
    });
  }
});

// Get episode details
router.get("/:id/seasons/:num/episodes/:episode", async (req: Request, res: Response) => {
  try {
    const seriesId = parseInt(req.params.id);
    const seasonNumber = parseInt(req.params.num);
    const episodeNumber = parseInt(req.params.episode);

    if (isNaN(seriesId) || isNaN(seasonNumber) || isNaN(episodeNumber)) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Invalid series ID, season number, or episode number",
        },
        timestamp: new Date().toISOString(),
      });
    }

    const episode = await tmdbService.getEpisodeDetails(seriesId, seasonNumber, episodeNumber);

    const response: ApiResponse<typeof episode> = {
      success: true,
      data: episode,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Failed to fetch episode details",
      },
      timestamp: new Date().toISOString(),
    });
  }
});

export { router as seriesRoutes };
