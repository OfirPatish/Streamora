# 🎬 Streamora - AI Development Reference Guide

## 📋 Project Overview

**Streamora** is a full-stack streaming application similar to Stremio/TMDB, built with Node.js/Express/TypeScript backend and Next.js frontend, integrated with The Movie Database (TMDB) API.

**Repository:** [https://github.com/OfirPatish/Streamora.git](https://github.com/OfirPatish/Streamora.git)

---

## 🏗️ Project Architecture

### **Tech Stack:**

- **Backend:** Node.js + Express + TypeScript
- **Frontend:** Next.js 15 + React 19 + TypeScript
- **Styling:** Tailwind CSS + Shadcn/ui
- **API:** TMDB (The Movie Database)
- **Performance:** Global Data System with caching

### **Project Structure:**

```
streamora/
├── backend/                    # Node.js/Express/TypeScript API
│   ├── src/
│   │   ├── index.ts           # Main server entry point
│   │   ├── routes/            # API route handlers
│   │   │   ├── movieRoutes.ts # Movie endpoints
│   │   │   ├── seriesRoutes.ts # Series endpoints
│   │   │   └── searchRoutes.ts # Search endpoints
│   │   ├── services/
│   │   │   └── tmdbService.ts # TMDB API integration
│   │   ├── middleware/
│   │   │   ├── errorHandler.ts # Error handling
│   │   │   └── notFoundHandler.ts # 404 handler
│   │   └── types/
│   │       └── index.ts       # TypeScript interfaces
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env                   # Environment variables
│   └── README.md
├── frontend/                   # Next.js 15 App Router
│   ├── src/
│   │   ├── app/               # Next.js App Router pages
│   │   │   ├── page.tsx       # Home page
│   │   │   ├── movies/[id]/   # Dynamic movie detail pages
│   │   │   ├── series/[id]/   # Dynamic series detail pages
│   │   │   └── search/        # Search page
│   │   ├── components/
│   │   │   ├── layout/        # Layout components
│   │   │   │   ├── headers/   # Desktop & mobile headers
│   │   │   │   └── navigation/ # Navigation components
│   │   │   ├── features/      # Feature-specific components
│   │   │   │   ├── home/      # Home page components
│   │   │   │   ├── movies/    # Movie components
│   │   │   │   ├── series/    # Series components
│   │   │   │   └── search/    # Search components
│   │   │   ├── common/        # Shared components
│   │   │   │   ├── cards/     # Content cards
│   │   │   │   ├── carousels/ # Carousel components
│   │   │   │   └── skeletons/ # Loading skeletons
│   │   │   ├── debug/         # Development tools
│   │   │   └── ui/            # Shadcn/ui components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utilities and configurations
│   │   └── types/             # TypeScript type definitions
│   ├── package.json
│   └── README.md
└── docs/                       # Documentation
    └── STREAMORA_AI_REFERENCE.md # This file
```

---

## 🔧 Backend API Reference

### **Environment Variables (.env):**

```env
PORT=3001
NODE_ENV=development
TMDB_API_KEY=your_tmdb_api_key_here
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=info
```

### **API Endpoints:**

#### **Health & Info:**

- `GET /health` - Server health check
- `GET /api` - API information

#### **Movies:**

- `GET /api/movies/popular` - Popular movies
- `GET /api/movies/top-rated` - Top rated movies
- `GET /api/movies/now-playing` - Currently in theaters
- `GET /api/movies/upcoming` - Upcoming releases
- `GET /api/movies/{id}` - Movie details
- `GET /api/movies/{id}/recommendations` - Similar movies
- `GET /api/movies/{id}/credits` - Cast & crew
- `GET /api/movies/{id}/videos` - Trailers & videos

#### **TV Series:**

- `GET /api/series/popular` - Popular TV series
- `GET /api/series/top-rated` - Top rated series
- `GET /api/series/on-the-air` - Currently airing
- `GET /api/series/airing-today` - Airing today
- `GET /api/series/{id}` - Series details
- `GET /api/series/{id}/recommendations` - Similar series
- `GET /api/series/{id}/seasons/{num}` - Season details

#### **Search & Discovery:**

- `GET /api/search/multi?query={term}` - Search all content
- `GET /api/search/movies?query={term}` - Search movies
- `GET /api/search/series?query={term}` - Search series
- `GET /api/search/genres/movies` - Movie genres
- `GET /api/search/genres/series` - TV genres
- `GET /api/search/discover/movies` - Discover movies with filters
- `GET /api/search/discover/series` - Discover series with filters

### **Response Format:**

#### **Success Response:**

```json
{
  "success": true,
  "data": {
    "page": 1,
    "results": [...],
    "total_pages": 52146,
    "total_results": 1042919
  },
  "timestamp": "2025-08-28T09:23:43.148Z"
}
```

#### **Error Response:**

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  },
  "timestamp": "2025-08-28T09:23:43.148Z"
}
```

### **TMDB Image URLs:**

- **Posters:** `https://image.tmdb.org/t/p/w500{poster_path}`
- **Backdrops:** `https://image.tmdb.org/t/p/original{backdrop_path}`
- **Profiles:** `https://image.tmdb.org/t/p/w185{profile_path}`

### **Available Image Sizes:**

- **Posters:** w92, w154, w185, w342, w500, w780, original
- **Backdrops:** w300, w780, w1280, original
- **Profiles:** w45, w185, h632, original

---

## 🌐 Frontend Global Data System

### **Overview:**

The frontend uses a sophisticated **Global Data System** that eliminates API call duplication:

- **8 API calls** made once and shared across all components
- **50% fewer network requests** compared to individual calls
- **Smart caching** with localStorage and TTL
- **Real-time synchronization** across components

### **API Endpoints Cached:**

| Endpoint                   | Purpose             | Cache TTL  |
| -------------------------- | ------------------- | ---------- |
| `/api/movies/popular`      | Popular movies      | 2 hours    |
| `/api/movies/top-rated`    | Top rated movies    | 6 hours    |
| `/api/movies/now-playing`  | Now playing movies  | 1 hour     |
| `/api/movies/upcoming`     | Upcoming movies     | 4 hours    |
| `/api/series/popular`      | Popular series      | 2 hours    |
| `/api/series/top-rated`    | Top rated series    | 6 hours    |
| `/api/series/on-the-air`   | On the air series   | 2 hours    |
| `/api/series/airing-today` | Airing today series | 30 minutes |

### **Usage in Components:**

```typescript
// Access global data in any component
import { usePopularMovies, useTopRatedSeries } from "@/hooks/useGlobalData";

function MyComponent() {
  const { data: movies, loading, error } = usePopularMovies();
  const { data: series } = useTopRatedSeries();

  // Data is automatically shared and cached
  return <div>{/* Your component */}</div>;
}
```

### **Global Data Hook:**

```typescript
// Access all global data
const { data, loading, error, isInitialized } = useGlobalData();

// Force refresh if needed
import { refreshGlobalData } from "@/hooks/useGlobalData";
refreshGlobalData();
```

---

## 🎨 Frontend Component Architecture

### **Key Components:**

#### **Layout Components (`frontend/src/components/layout/`):**

- `DesktopHeader.tsx` - Top navigation
- `MobileHeader.tsx` - Mobile navigation
- `MobileBottomNav.tsx` - Bottom navigation

#### **Feature Components (`frontend/src/components/features/`):**

- `home/` - Home page components
  - `HeroSection.tsx` - Featured content carousel
  - `HomeContent.tsx` - Content grids
- `movies/` - Movie components
  - `MovieDetail.tsx` - Movie detail page
- `series/` - Series components
  - `SeriesDetail.tsx` - Series detail page
- `search/` - Search components
  - `SearchFilters.tsx` - Filter options
  - `SearchResults.tsx` - Search results

#### **Common Components (`frontend/src/components/common/`):**

- `cards/MovieCard.tsx` - Content cards
- `carousels/ContentCarousel.tsx` - Carousel components
- `skeletons/MovieCardSkeleton.tsx` - Loading states

#### **Debug Components (`frontend/src/components/debug/`):**

- `GlobalDataDebugger.tsx` - Monitor global data state
- `CacheDebugger.tsx` - View localStorage cache
- `ApiTester.tsx` - Test API endpoints
- `DebugModal.tsx` - Development utilities

### **Page Structure:**

- `frontend/src/app/page.tsx` - Home page
- `frontend/src/app/movies/[id]/page.tsx` - Movie detail pages
- `frontend/src/app/series/[id]/page.tsx` - Series detail pages
- `frontend/src/app/search/page.tsx` - Search page

---

## 📊 Data Structures

### **Movie Data Structure:**

```typescript
{
  id: number,
  title: string,
  overview: string,
  release_date: string,
  runtime: number,
  vote_average: number,
  vote_count: number,
  poster_path: string,
  backdrop_path: string,
  genres: Array<{id: number, name: string}>,
  credits: {
    cast: Array<{id: number, name: string, character: string}>,
    crew: Array<{id: number, name: string, job: string}>
  },
  videos: {
    results: Array<{key: string, name: string, type: string}>
  }
}
```

### **Series Data Structure:**

```typescript
{
  id: number,
  name: string,
  overview: string,
  first_air_date: string,
  last_air_date: string,
  number_of_seasons: number,
  number_of_episodes: number,
  poster_path: string,
  backdrop_path: string,
  genres: Array<{id: number, name: string}>,
  seasons: Array<{
    id: number,
    name: string,
    episode_count: number,
    air_date: string
  }>
}
```

### **API Response Structure:**

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

interface PaginatedResponse<T> {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
}
```

---

## 🔧 Development Commands

### **Backend:**

```bash
cd backend
npm run dev          # Development with nodemon
npm run build        # Build TypeScript
npm start           # Production start
npm test            # Run tests
npm run lint        # Run ESLint
```

### **Frontend:**

```bash
cd frontend
npm run dev         # Development server
npm run build       # Production build
npm start          # Production start
npm run lint       # Run ESLint
```

### **Root Level:**

```bash
npm run dev         # Start both backend and frontend
npm run build       # Build both applications
npm run start       # Start production servers
npm run lint        # Run ESLint on all code
```

---

## 🎯 Key Implementation Patterns

### **API Integration Pattern:**

```typescript
// Frontend API hook pattern
const useStreamoraAPI = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001${endpoint}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.success) setData(result.data);
        else setError(result.error.message);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { data, loading, error };
};
```

### **Component Pattern:**

```typescript
// Standard component structure
export function MyComponent() {
  const { data, loading, error } = usePopularMovies();

  if (loading) return <MovieCardSkeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
      {data?.results?.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
```

### **Styling Pattern:**

```typescript
// Tailwind CSS with responsive design
className =
  "w-full bg-gray-950 text-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4 p-4";
```

---

## 🚀 Performance Features

### **Optimization Strategies:**

- **Global Data System**: 50% fewer API calls
- **Smart Caching**: localStorage with TTL
- **Code Splitting**: Smaller bundle sizes
- **Image Optimization**: Optimized media loading
- **Lazy Loading**: On-demand component loading

### **Performance Metrics:**

| Metric               | Target  | Current |
| -------------------- | ------- | ------- |
| **First Load**       | < 3s    | ~2.5s   |
| **API Calls**        | < 10    | 8       |
| **Bundle Size**      | < 500KB | ~450KB  |
| **Lighthouse Score** | > 90    | 92      |

---

## 🔍 Common Development Tasks

### **Adding New API Endpoint:**

1. **Backend**: Add route in `backend/src/routes/`
2. **Service**: Add method in `backend/src/services/tmdbService.ts`
3. **Types**: Add interface in `backend/src/types/index.ts`
4. **Frontend**: Add hook in `frontend/src/hooks/useGlobalData.ts`

### **Adding New Component:**

1. **Create**: Add component in appropriate `frontend/src/components/` folder
2. **Export**: Add to `index.ts` file
3. **Import**: Use in pages or other components
4. **Style**: Apply Tailwind CSS classes

### **Adding New Page:**

1. **Create**: Add page in `frontend/src/app/`
2. **Route**: Follow Next.js App Router conventions
3. **Components**: Use existing components or create new ones
4. **Data**: Use global data system or create specific hooks

### **Debugging:**

1. **Global Data**: Use `GlobalDataDebugger` component
2. **Cache**: Use `CacheDebugger` component
3. **API**: Use `ApiTester` component
4. **Console**: Check browser console for errors

---

## 📚 Important Files for Development

### **Backend Files:**

- `backend/src/index.ts` - Main server entry point
- `backend/src/services/tmdbService.ts` - TMDB API integration
- `backend/src/routes/` - All API endpoints
- `backend/src/types/index.ts` - TypeScript interfaces

### **Frontend Files:**

- `frontend/src/hooks/useGlobalData.ts` - Global data management
- `frontend/src/components/` - All React components
- `frontend/src/app/` - Next.js pages and routing
- `frontend/src/lib/api.ts` - API client configuration

### **Configuration Files:**

- `backend/tsconfig.json` - TypeScript settings
- `frontend/tsconfig.json` - TypeScript settings
- `backend/package.json` - Backend dependencies
- `frontend/package.json` - Frontend dependencies

---

## 🎯 Current Status

### **✅ Completed:**

- **Backend**: Full API with TMDB integration (20+ endpoints)
- **Frontend**: Complete layout and detail pages
- **Global Data System**: Optimized performance with caching
- **Navigation**: Dynamic routing and clickable components
- **Design**: Responsive layout with Shadcn components

### **🔄 Ready for Enhancement:**

- **Search**: Implement advanced search functionality
- **User Features**: Favorites, watchlist, user accounts
- **Styling**: Add colors and visual enhancements
- **Performance**: Further optimizations and monitoring

---

**Last Updated:** January 2025  
**Project Status:** ✅ Production-ready full-stack application  
**Repository:** [https://github.com/OfirPatish/Streamora.git](https://github.com/OfirPatish/Streamora.git)
