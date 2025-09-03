// Load environment variables FIRST, before any other imports
import dotenv from "dotenv";
import path from "path";

// Configure dotenv to look for .env file in the backend directory (one level up from src)
// This works for both Windows and macOS
const envPath = path.resolve(__dirname, "..", ".env");
console.log("🔍 Looking for .env file at:", envPath);
console.log("📁 Current __dirname:", __dirname);

const result = dotenv.config({ path: envPath });
if (result.error) {
  console.error("❌ Error loading .env file:", result.error);
} else {
  console.log("✅ .env file loaded successfully");
  console.log("🔑 Environment variables loaded:", Object.keys(result.parsed || {}));
}

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import { rateLimit } from "express-rate-limit";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFoundHandler";
import { movieRoutes } from "./routes/movieRoutes";
import { seriesRoutes } from "./routes/seriesRoutes";
import { searchRoutes } from "./routes/searchRoutes";
import healthRoutes from "./routes/healthRoutes";

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"), // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Streamora API is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// API routes
app.use("/api/movies", movieRoutes);
app.use("/api/series", seriesRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/health", healthRoutes);

// API documentation endpoint
app.get("/api", (req, res) => {
  res.json({
    name: "Streamora API",
    version: "1.0.0",
    description: "A Stremio-like API for movies and series",
    endpoints: {
      movies: "/api/movies",
      series: "/api/series",
      search: "/api/search",
      health: "/health",
    },
  });
});

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Streamora API server running on port ${PORT}`);
  console.log(`📖 API Documentation: http://localhost:${PORT}/api`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
});

export default app;
