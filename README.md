# 🎬 Streamora

A Stremio-like streaming application built with Node.js/Express/TypeScript backend and Next.js frontend, integrated with The Movie Database (TMDB) API.

![Streamora](https://img.shields.io/badge/Streamora-Streaming%20Platform-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [API Documentation](#-api-documentation)
- [Development](#-development)
- [Contributing](#-contributing)

## ✨ Features

### 🎯 Core Features

- **Movie & TV Series Discovery** - Browse popular, top-rated, and trending content
- **Comprehensive Detail Pages** - Detailed information for movies and series
- **Responsive Design** - Full-width layout optimized for all devices
- **Dynamic Routing** - SEO-friendly URLs for content pages
- **Modern UI/UX** - Built with Shadcn/ui components

### 🎨 UI Components

- **Hero Section** - Featured content with call-to-action
- **Content Grids** - Organized content rows with pagination
- **Navigation** - Header with search and sidebar with categories
- **Detail Pages** - Comprehensive movie/series information
- **Cast & Crew** - Actor information and production details

### 🔧 Technical Features

- **TypeScript** - Full type safety across the stack
- **API Integration** - TMDB API for real movie/series data
- **Security** - CORS, Helmet, Rate limiting
- **Performance** - Compression, caching, optimized builds

## 🛠️ Tech Stack

### Backend

- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **API:** TMDB (The Movie Database)
- **Security:** Helmet, CORS, Rate Limiting
- **Logging:** Morgan
- **Compression:** Gzip

### Frontend

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Library:** Shadcn/ui
- **Icons:** Lucide React

## 📁 Project Structure

```
streamora/
├── backend/                    # Node.js/Express/TypeScript API
│   ├── src/
│   │   ├── index.ts           # Main server entry point
│   │   ├── routes/            # API route handlers
│   │   ├── services/          # TMDB API integration
│   │   ├── middleware/        # Error handling & security
│   │   └── types/            # TypeScript interfaces
│   ├── package.json
│   ├── tsconfig.json
│   └── STREAMORA_BACKEND_SUMMARY.md
├── frontend/                  # Next.js 14 App Router
│   ├── src/
│   │   ├── app/              # Next.js App Router pages
│   │   ├── components/       # React components
│   │   └── globals.css
│   └── package.json
├── README.md
├── STREAMORA_AI_REFERENCE.md
└── .gitignore
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- TMDB API key ([Get one here](https://www.themoviedb.org/settings/api))

### 1. Clone the Repository

```bash
git clone https://github.com/OfirPatish/Streamora.git
cd Streamora
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your TMDB API key
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 4. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001

## 📚 API Documentation

The backend provides a comprehensive REST API with the following endpoints:

### Movies

- `GET /api/movies/popular` - Popular movies
- `GET /api/movies/top-rated` - Top rated movies
- `GET /api/movies/now-playing` - Currently in theaters
- `GET /api/movies/upcoming` - Upcoming releases
- `GET /api/movies/{id}` - Movie details
- `GET /api/movies/{id}/recommendations` - Similar movies
- `GET /api/movies/{id}/credits` - Cast & crew
- `GET /api/movies/{id}/videos` - Trailers & videos

### TV Series

- `GET /api/series/popular` - Popular TV series
- `GET /api/series/top-rated` - Top rated series
- `GET /api/series/on-the-air` - Currently airing
- `GET /api/series/airing-today` - Airing today
- `GET /api/series/{id}` - Series details
- `GET /api/series/{id}/recommendations` - Similar series
- `GET /api/series/{id}/seasons/{num}` - Season details

### Search & Discovery

- `GET /api/search/multi?query={term}` - Search all content
- `GET /api/search/movies?query={term}` - Search movies
- `GET /api/search/series?query={term}` - Search series
- `GET /api/search/genres/movies` - Movie genres
- `GET /api/search/genres/series` - TV genres
- `GET /api/search/discover/movies` - Discover movies with filters
- `GET /api/search/discover/series` - Discover series with filters

For complete API documentation, see [STREAMORA_BACKEND_SUMMARY.md](backend/STREAMORA_BACKEND_SUMMARY.md)

## 🛠️ Development

### Backend Development

```bash
cd backend
npm run dev          # Development with nodemon
npm run build        # Build TypeScript
npm start           # Production start
```

### Frontend Development

```bash
cd frontend
npm run dev         # Development server
npm run build       # Production build
npm start          # Production start
```

### Environment Variables

#### Backend (.env)

```env
PORT=3001
NODE_ENV=development
TMDB_API_KEY=your_tmdb_api_key_here
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=info
```

## 🎯 Current Status

### ✅ Completed

- **Backend:** Full API with TMDB integration
- **Frontend:** Complete layout and detail pages
- **Navigation:** Dynamic routing and clickable components
- **Design:** Responsive layout with Shadcn components
- **Structure:** Well-organized, modular codebase

### 🔄 In Progress

- **API Integration:** Connecting frontend to backend
- **Search Functionality:** Implementing search features
- **User Features:** Favorites, watchlist, etc.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie and TV series data
- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Express.js](https://expressjs.com/) for the robust backend framework

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Made with ❤️ by [Ofir Patish](https://github.com/OfirPatish)**
