import { Router, Request, Response } from "express";
import { tmdbService } from "../services/tmdbService";
import { ApiResponse } from "../types";

const router = Router();

// Multi-search (movies, series, people)
router.get("/multi", async (req: Request, res: Response) => {
  try {
    const query = req.query.query as string;
    const page = parseInt(req.query.page as string) || 1;

    if (!query || query.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Search query is required",
        },
        timestamp: new Date().toISOString(),
      });
    }

    const results = await tmdbService.searchMulti(query, page);

    const response: ApiResponse<typeof results> = {
      success: true,
      data: results,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Failed to perform multi-search",
      },
      timestamp: new Date().toISOString(),
    });
  }
});

// Search movies only
router.get("/movies", async (req: Request, res: Response) => {
  try {
    const query = req.query.query as string;
    const page = parseInt(req.query.page as string) || 1;

    if (!query || query.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Search query is required",
        },
        timestamp: new Date().toISOString(),
      });
    }

    const results = await tmdbService.searchMovies(query, page);

    const response: ApiResponse<typeof results> = {
      success: true,
      data: results,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Failed to search movies",
      },
      timestamp: new Date().toISOString(),
    });
  }
});

// Search series only
router.get("/series", async (req: Request, res: Response) => {
  try {
    const query = req.query.query as string;
    const page = parseInt(req.query.page as string) || 1;

    if (!query || query.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Search query is required",
        },
        timestamp: new Date().toISOString(),
      });
    }

    const results = await tmdbService.searchSeries(query, page);

    const response: ApiResponse<typeof results> = {
      success: true,
      data: results,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Failed to search series",
      },
      timestamp: new Date().toISOString(),
    });
  }
});

// Get movie genres
router.get("/genres/movies", async (req: Request, res: Response) => {
  try {
    const genres = await tmdbService.getMovieGenres();

    const response: ApiResponse<typeof genres> = {
      success: true,
      data: genres,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Failed to fetch movie genres",
      },
      timestamp: new Date().toISOString(),
    });
  }
});

// Get series genres
router.get("/genres/series", async (req: Request, res: Response) => {
  try {
    const genres = await tmdbService.getSeriesGenres();

    const response: ApiResponse<typeof genres> = {
      success: true,
      data: genres,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Failed to fetch series genres",
      },
      timestamp: new Date().toISOString(),
    });
  }
});

// Discover movies with filters
router.get("/discover/movies", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const sortBy = (req.query.sort_by as string) || "popularity.desc";
    const year = req.query.year ? parseInt(req.query.year as string) : undefined;
    const genre = req.query.genre ? parseInt(req.query.genre as string) : undefined;
    const voteAverageGte = req.query.vote_average_gte ? parseFloat(req.query.vote_average_gte as string) : undefined;

    const results = await tmdbService.discoverMovies({
      page,
      sort_by: sortBy,
      ...(year && { year }),
      ...(genre && { genre }),
      ...(voteAverageGte && { vote_average_gte: voteAverageGte }),
    });

    const response: ApiResponse<typeof results> = {
      success: true,
      data: results,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Failed to discover movies",
      },
      timestamp: new Date().toISOString(),
    });
  }
});

// Discover series with filters
router.get("/discover/series", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const sortBy = (req.query.sort_by as string) || "popularity.desc";
    const year = req.query.year ? parseInt(req.query.year as string) : undefined;
    const genre = req.query.genre ? parseInt(req.query.genre as string) : undefined;
    const voteAverageGte = req.query.vote_average_gte ? parseFloat(req.query.vote_average_gte as string) : undefined;

    const results = await tmdbService.discoverSeries({
      page,
      sort_by: sortBy,
      ...(year && { year }),
      ...(genre && { genre }),
      ...(voteAverageGte && { vote_average_gte: voteAverageGte }),
    });

    const response: ApiResponse<typeof results> = {
      success: true,
      data: results,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Failed to discover series",
      },
      timestamp: new Date().toISOString(),
    });
  }
});

export { router as searchRoutes };
