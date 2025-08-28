import { Router, Request, Response } from "express";
import { tmdbService } from "../services/tmdbService";
import { ApiResponse } from "../types";

const router = Router();

// Get popular movies
router.get("/popular", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const movies = await tmdbService.getPopularMovies(page);

    const response: ApiResponse<typeof movies> = {
      success: true,
      data: movies,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Failed to fetch popular movies",
      },
      timestamp: new Date().toISOString(),
    });
  }
});

// Get top rated movies
router.get("/top-rated", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const movies = await tmdbService.getTopRatedMovies(page);

    const response: ApiResponse<typeof movies> = {
      success: true,
      data: movies,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Failed to fetch top rated movies",
      },
      timestamp: new Date().toISOString(),
    });
  }
});

// Get now playing movies
router.get("/now-playing", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const movies = await tmdbService.getNowPlayingMovies(page);

    const response: ApiResponse<typeof movies> = {
      success: true,
      data: movies,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Failed to fetch now playing movies",
      },
      timestamp: new Date().toISOString(),
    });
  }
});

// Get upcoming movies
router.get("/upcoming", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const movies = await tmdbService.getUpcomingMovies(page);

    const response: ApiResponse<typeof movies> = {
      success: true,
      data: movies,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Failed to fetch upcoming movies",
      },
      timestamp: new Date().toISOString(),
    });
  }
});

// Get movie details by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const movieId = parseInt(req.params.id);

    if (isNaN(movieId)) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Invalid movie ID",
        },
        timestamp: new Date().toISOString(),
      });
    }

    const movie = await tmdbService.getMovieDetails(movieId);

    const response: ApiResponse<typeof movie> = {
      success: true,
      data: movie,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Failed to fetch movie details",
      },
      timestamp: new Date().toISOString(),
    });
  }
});

// Get movie recommendations
router.get("/:id/recommendations", async (req: Request, res: Response) => {
  try {
    const movieId = parseInt(req.params.id);
    const page = parseInt(req.query.page as string) || 1;

    if (isNaN(movieId)) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Invalid movie ID",
        },
        timestamp: new Date().toISOString(),
      });
    }

    const recommendations = await tmdbService.getMovieRecommendations(movieId, page);

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
        message: error instanceof Error ? error.message : "Failed to fetch movie recommendations",
      },
      timestamp: new Date().toISOString(),
    });
  }
});

// Get movie credits
router.get("/:id/credits", async (req: Request, res: Response) => {
  try {
    const movieId = parseInt(req.params.id);

    if (isNaN(movieId)) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Invalid movie ID",
        },
        timestamp: new Date().toISOString(),
      });
    }

    const credits = await tmdbService.getMovieCredits(movieId);

    const response: ApiResponse<typeof credits> = {
      success: true,
      data: credits,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Failed to fetch movie credits",
      },
      timestamp: new Date().toISOString(),
    });
  }
});

// Get movie videos
router.get("/:id/videos", async (req: Request, res: Response) => {
  try {
    const movieId = parseInt(req.params.id);

    if (isNaN(movieId)) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Invalid movie ID",
        },
        timestamp: new Date().toISOString(),
      });
    }

    const videos = await tmdbService.getMovieVideos(movieId);

    const response: ApiResponse<typeof videos> = {
      success: true,
      data: videos,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Failed to fetch movie videos",
      },
      timestamp: new Date().toISOString(),
    });
  }
});

export { router as movieRoutes };
