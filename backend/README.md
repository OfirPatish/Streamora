# Streamora Backend

A modern, TypeScript-based backend API for Streamora - a Stremio-like movie and series streaming application. This backend provides a comprehensive API for fetching movie and series data from The Movie Database (TMDB).

## 🚀 Features

- **Movie Management**: Popular, top-rated, now playing, and upcoming movies
- **Series Management**: Popular, top-rated, on-air, and airing today series
- **Search Functionality**: Multi-search across movies, series, and people
- **Genre Filtering**: Filter content by genres
- **Discovery**: Advanced filtering and sorting options
- **Episode Management**: Season and episode details for series
- **Security**: Rate limiting, CORS, and security headers
- **TypeScript**: Full type safety and modern development experience

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- TMDB API key (free at [themoviedb.org](https://www.themoviedb.org/settings/api))

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd streamora
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your TMDB API key:
   ```env
   TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3001`

## 📚 API Endpoints

### Health Check
- `GET /health` - Server health status

### Movies
- `GET /api/movies/popular` - Get popular movies
- `GET /api/movies/top-rated` - Get top rated movies
- `GET /api/movies/now-playing` - Get now playing movies
- `GET /api/movies/upcoming` - Get upcoming movies
- `GET /api/movies/:id` - Get movie details
- `GET /api/movies/:id/recommendations` - Get movie recommendations
- `GET /api/movies/:id/credits` - Get movie credits
- `GET /api/movies/:id/videos` - Get movie videos

### Series
- `GET /api/series/popular` - Get popular series
- `GET /api/series/top-rated` - Get top rated series
- `GET /api/series/on-the-air` - Get on the air series
- `GET /api/series/airing-today` - Get airing today series
- `GET /api/series/:id` - Get series details
- `GET /api/series/:id/recommendations` - Get series recommendations
- `GET /api/series/:id/seasons/:seasonNumber` - Get season details
- `GET /api/series/:id/seasons/:seasonNumber/episodes/:episodeNumber` - Get episode details

### Search
- `GET /api/search/multi?query=<search_term>` - Multi-search (movies, series, people)
- `GET /api/search/movies?query=<search_term>` - Search movies only
- `GET /api/search/series?query=<search_term>` - Search series only
- `GET /api/search/genres/movies` - Get movie genres
- `GET /api/search/genres/series` - Get series genres
- `GET /api/search/discover/movies` - Discover movies with filters
- `GET /api/search/discover/series` - Discover series with filters

### Query Parameters

Most endpoints support pagination:
- `page` - Page number (default: 1)

Search endpoints require:
- `query` - Search term (required)

Discovery endpoints support:
- `sort_by` - Sort field (popularity.desc, vote_average.desc, etc.)
- `year` - Filter by year
- `genre` - Filter by genre ID
- `vote_average_gte` - Minimum vote average

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

### Project Structure

```
src/
├── index.ts              # Main server entry point
├── middleware/           # Express middleware
│   ├── errorHandler.ts   # Error handling middleware
│   └── notFoundHandler.ts # 404 handler
├── routes/              # API routes
│   ├── movieRoutes.ts   # Movie endpoints
│   ├── seriesRoutes.ts  # Series endpoints
│   └── searchRoutes.ts  # Search endpoints
├── services/            # Business logic
│   └── tmdbService.ts   # TMDB API service
└── types/               # TypeScript type definitions
    └── index.ts         # API types and interfaces
```

## 🔒 Security Features

- **Rate Limiting**: Configurable rate limiting per IP
- **CORS**: Cross-origin resource sharing configuration
- **Helmet**: Security headers
- **Input Validation**: Request parameter validation
- **Error Handling**: Comprehensive error handling and logging

## 🌐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3001 |
| `NODE_ENV` | Environment | development |
| `TMDB_API_KEY` | TMDB API key | Required |
| `CORS_ORIGIN` | CORS origin | http://localhost:3000 |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | 900000 (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |

## 📝 API Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

Error responses:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
