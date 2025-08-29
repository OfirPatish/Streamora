# 🚀 Streamora Backend

[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-black.svg)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2+-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A production-ready Node.js/Express API server for Streamora, providing comprehensive movie and series data through TMDB integration with security, rate limiting, and error handling.

## ✨ Features

| Category           | Features                                       |
| ------------------ | ---------------------------------------------- |
| 🎬 **Movies**      | Popular, top-rated, now playing, upcoming      |
| 📺 **Series**      | Popular, top-rated, on-air, airing today       |
| 🔍 **Search**      | Multi-search across movies, series, and people |
| 🎯 **Discovery**   | Advanced filtering and sorting                 |
| 🔒 **Security**    | Rate limiting, CORS, security headers          |
| 💻 **Development** | Full TypeScript support                        |

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **TMDB API key** ([Get free key here](https://www.themoviedb.org/settings/api))

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env

# 3. Add your TMDB API key to .env
# TMDB_API_KEY=your_actual_api_key_here

# 4. Build project
npm run build

# 5. Start development server
npm run dev
```

🎉 **Server running on:** `http://localhost:3001`

## 📚 API Reference

### Health & Info

| Endpoint  | Method | Description         |
| --------- | ------ | ------------------- |
| `/health` | GET    | Server health check |
| `/api`    | GET    | API information     |

### Movies

| Endpoint                          | Method | Description           |
| --------------------------------- | ------ | --------------------- |
| `/api/movies/popular`             | GET    | Popular movies        |
| `/api/movies/top-rated`           | GET    | Top rated movies      |
| `/api/movies/now-playing`         | GET    | Now playing movies    |
| `/api/movies/upcoming`            | GET    | Upcoming movies       |
| `/api/movies/:id`                 | GET    | Movie details         |
| `/api/movies/:id/recommendations` | GET    | Movie recommendations |
| `/api/movies/:id/credits`         | GET    | Movie credits         |
| `/api/movies/:id/videos`          | GET    | Movie videos          |

### Series

| Endpoint                                                        | Method | Description            |
| --------------------------------------------------------------- | ------ | ---------------------- |
| `/api/series/popular`                                           | GET    | Popular series         |
| `/api/series/top-rated`                                         | GET    | Top rated series       |
| `/api/series/on-the-air`                                        | GET    | On the air series      |
| `/api/series/airing-today`                                      | GET    | Airing today series    |
| `/api/series/:id`                                               | GET    | Series details         |
| `/api/series/:id/recommendations`                               | GET    | Series recommendations |
| `/api/series/:id/seasons/:seasonNumber`                         | GET    | Season details         |
| `/api/series/:id/seasons/:seasonNumber/episodes/:episodeNumber` | GET    | Episode details        |

### Search

| Endpoint                          | Method | Description                  |
| --------------------------------- | ------ | ---------------------------- |
| `/api/search/multi?query=<term>`  | GET    | Multi-search                 |
| `/api/search/movies?query=<term>` | GET    | Search movies                |
| `/api/search/series?query=<term>` | GET    | Search series                |
| `/api/search/genres/movies`       | GET    | Movie genres                 |
| `/api/search/genres/series`       | GET    | Series genres                |
| `/api/search/discover/movies`     | GET    | Discover movies with filters |
| `/api/search/discover/series`     | GET    | Discover series with filters |

### Query Parameters

| Parameter          | Type   | Description                                     | Default         |
| ------------------ | ------ | ----------------------------------------------- | --------------- |
| `page`             | number | Page number                                     | 1               |
| `query`            | string | Search term (required for search)               | -               |
| `sort_by`          | string | Sort field (popularity.desc, vote_average.desc) | popularity.desc |
| `year`             | number | Filter by year                                  | -               |
| `genre`            | number | Filter by genre ID                              | -               |
| `vote_average_gte` | number | Minimum vote average                            | -               |

## 🔧 Development

### Available Scripts

| Command            | Description                              |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Start development server with hot reload |
| `npm run build`    | Build for production                     |
| `npm start`        | Start production server                  |
| `npm test`         | Run tests                                |
| `npm run lint`     | Run ESLint                               |
| `npm run lint:fix` | Fix ESLint issues                        |

### Project Structure

```
src/
├── 📁 index.ts              # Main server entry point
├── 📁 middleware/           # Express middleware
│   ├── errorHandler.ts      # Error handling
│   └── notFoundHandler.ts   # 404 handler
├── 📁 routes/              # API routes
│   ├── movieRoutes.ts      # Movie endpoints
│   ├── seriesRoutes.ts     # Series endpoints
│   └── searchRoutes.ts     # Search endpoints
├── 📁 services/            # Business logic
│   └── tmdbService.ts      # TMDB API service
└── 📁 types/               # TypeScript types
    └── index.ts            # API types
```

## ⚙️ Configuration

### Environment Variables

| Variable                  | Description             | Default               | Required |
| ------------------------- | ----------------------- | --------------------- | -------- |
| `PORT`                    | Server port             | 3001                  | ❌       |
| `NODE_ENV`                | Environment             | development           | ❌       |
| `TMDB_API_KEY`            | TMDB API key            | -                     | ✅       |
| `CORS_ORIGIN`             | CORS origin             | http://localhost:3000 | ❌       |
| `RATE_LIMIT_WINDOW_MS`    | Rate limit window       | 900000 (15 min)       | ❌       |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100                   | ❌       |

### Security Features

- 🔒 **Rate Limiting**: Configurable per IP
- 🌐 **CORS**: Cross-origin resource sharing
- 🛡️ **Helmet**: Security headers
- ✅ **Input Validation**: Request parameter validation
- 🚨 **Error Handling**: Comprehensive error handling

## 📝 API Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    "results": [...],
    "page": 1,
    "total_pages": 500,
    "total_results": 10000
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "message": "TMDB API key is required",
    "code": "MISSING_API_KEY"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🆘 Troubleshooting

### Common Issues

| Issue                             | Solution                                                   |
| --------------------------------- | ---------------------------------------------------------- |
| **"TMDB API key not configured"** | Add your TMDB API key to `.env` file                       |
| **"Port already in use"**         | Change PORT in `.env` or kill process using port 3001      |
| **"Module not found" errors**     | Run `npm install` and `npm run build`                      |
| **"API returns errors"**          | Verify TMDB API key is valid and check internet connection |

### Getting Help

1. **Check the logs** for detailed error messages
2. **Verify your TMDB API key** is working
3. **Test the health endpoint**: `GET /health`
4. **Check TMDB API status** at [status.themoviedb.org](https://status.themoviedb.org/)

## 📄 License

This project is licensed under the **MIT License**.

## 🔗 Useful Links

- 🌐 [TMDB API Documentation](https://developers.themoviedb.org/3)
- 🚀 [Express.js Documentation](https://expressjs.com/)
- 📘 [TypeScript Documentation](https://www.typescriptlang.org/)
- 🎯 [Get TMDB API Key](https://www.themoviedb.org/settings/api)
