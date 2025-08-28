# 🎬 Streamora - AI Reference Guide

## 📋 Project Overview

**Streamora** is a content discovery platform similar to Stremio/TMDB, focusing on movie and TV series information, trailers, and recommendations. Built with a Node.js/Express/TypeScript backend and Next.js frontend, integrated with The Movie Database (TMDB) API.

**Repository:** [https://github.com/OfirPatish/Streamora.git](https://github.com/OfirPatish/Streamora.git)

---

## 🏗️ Project Structure

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
│   ├── .env                  # Environment variables
│   └── STREAMORA_BACKEND_SUMMARY.md
├── frontend/                  # Next.js 14 App Router
│   ├── src/
│   │   ├── app/              # Next.js App Router pages
│   │   │   ├── page.tsx      # Home page
│   │   │   ├── movies/[id]/  # Dynamic movie detail pages
│   │   │   └── series/[id]/  # Dynamic series detail pages
│   │   ├── components/       # React components
│   │   │   ├── layout/       # Layout components
│   │   │   ├── sections/     # Content sections
│   │   │   └── ui/          # Shadcn UI components
│   │   └── globals.css
│   └── package.json
└── STREAMORA_AI_REFERENCE.md  # This file
```

---

## 🔧 Backend Architecture

### **Tech Stack:**

- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **API:** TMDB (The Movie Database)
- **Security:** Helmet, CORS, Rate Limiting
- **Logging:** Morgan
- **Compression:** Gzip

### **Key Files:**

- `backend/src/index.ts` - Main server with middleware setup
- `backend/src/services/tmdbService.ts` - TMDB API integration
- `backend/src/routes/` - Movie, series, and search endpoints
- `backend/STREAMORA_BACKEND_SUMMARY.md` - Complete API documentation

### **Environment Variables:**

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

- **Movies:** `/api/movies/popular`, `/api/movies/{id}`, etc.
- **Series:** `/api/series/popular`, `/api/series/{id}`, etc.
- **Search:** `/api/search/multi`, `/api/search/discover`, etc.

---

## 🎨 Frontend Architecture

### **Tech Stack:**

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Library:** Shadcn/ui
- **Icons:** Lucide React

### **Component Organization:**

#### **Layout Components (`frontend/src/components/layout/`):**

- `Header.tsx` - Top navigation using Shadcn NavigationMenu
- `Sidebar.tsx` - Side navigation using Shadcn Sidebar
- `index.ts` - Layout exports

#### **Section Components (`frontend/src/components/sections/`):**

- `hero/HeroSection.tsx` - Featured content area
- `content-grid/` - Content display components
  - `ContentGrid.tsx` - Individual content row
  - `ContentSections.tsx` - All content sections
  - `movie-card/MovieCard.tsx` - Movie/Series cards
- `detail/` - Detail page components
  - `MovieDetail.tsx` - Movie detail page (193 lines)
  - `SeriesDetail.tsx` - Series detail page (264 lines)

#### **UI Components (`frontend/src/components/ui/`):**

- Shadcn components: Button, Card, Badge, Input, etc.
- Custom components built on top of Shadcn

### **Page Structure:**

- `frontend/src/app/page.tsx` - Home page with HeroSection + ContentSections
- `frontend/src/app/movies/[id]/page.tsx` - Dynamic movie detail pages
- `frontend/src/app/series/[id]/page.tsx` - Dynamic series detail pages

---

## 🎯 Key Features Implemented

### **Home Page:**

- ✅ **Hero Section** - Featured content with call-to-action buttons
- ✅ **Content Grids** - Multiple rows for movies and series
- ✅ **Responsive Design** - Full-width layout with proper breakpoints
- ✅ **Navigation** - Header with search and sidebar with categories

### **Detail Pages:**

- ✅ **Movie Details** - Comprehensive movie information display
- ✅ **Series Details** - TV series with seasons and episodes
- ✅ **Cast & Crew** - Actor information and production details
- ✅ **Videos Section** - Trailers and featurettes
- ✅ **Sidebar Info** - Production details, companies, ratings

### **Navigation:**

- ✅ **Clickable Cards** - MovieCard components navigate to detail pages
- ✅ **Dynamic Routing** - `/movies/{id}` and `/series/{id}` pages
- ✅ **Hover Effects** - Scale animations on card hover

---

## 📊 Data Structure

### **Mock Data Structure (Ready for API Integration):**

#### **Movie Data:**

```typescript
{
  id: number,
  title: string,
  overview: string,
  release_date: string,
  runtime: number,
  vote_average: number,
  vote_count: number,
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

#### **Series Data:**

```typescript
{
  id: number,
  name: string,
  overview: string,
  first_air_date: string,
  last_air_date: string,
  number_of_seasons: number,
  number_of_episodes: number,
  seasons: Array<{
    id: number,
    name: string,
    episode_count: number,
    air_date: string
  }>
}
```

---

## 🎨 Design System

### **Shadcn/ui Components Used:**

- **Navigation:** NavigationMenu, Sidebar
- **Layout:** Card, Separator
- **Interactive:** Button, Input, Badge
- **Feedback:** Tooltip, Skeleton

### **Styling Approach:**

- **No Color Styling** - Focus on structure and layout
- **Dark Theme** - Base dark theme with `bg-black text-white`
- **Responsive Grid** - `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8`
- **Full Width** - All containers use `w-full` for maximum screen usage

### **Icons:**

- **Lucide React** - Consistent icon library
- **Contextual Icons** - Film/Tv for content type, Play for actions, etc.

---

## 🔗 Navigation & Routing

### **File-based Routing (Next.js App Router):**

- `/` - Home page
- `/movies/{id}` - Movie detail pages
- `/series/{id}` - Series detail pages

### **Component Navigation:**

- **MovieCard** - Links to `/movies/{id}` or `/series/{id}`
- **Header** - Navigation menu with Home, Movies, Series
- **Sidebar** - Categories and genres navigation

---

## 🚀 Development Commands

### **Backend:**

```bash
cd backend
npm run dev          # Development with nodemon
npm run build        # Build TypeScript
npm start           # Production start
```

### **Frontend:**

```bash
cd frontend
npm run dev         # Development server
npm run build       # Production build
npm start          # Production start
```

---

## 📝 Code Style & Standards

### **TypeScript Configuration:**

- **Strict Mode:** Pragmatic settings for Express.js development
- **Relaxed Rules:** `noImplicitReturns: false`, `noUnusedLocals: false`
- **Maintained Rules:** `strict: true`, `noImplicitAny: true`

### **Code Organization:**

- **Component Files:** Under 200-300 lines each
- **Modular Structure:** Clear separation of concerns
- **Index Files:** Clean exports for easy imports
- **Type Safety:** Proper TypeScript interfaces throughout

### **Import Structure:**

```typescript
// Clean section imports
import { HeroSection } from "@/components/sections/hero";
import { ContentSections } from "@/components/sections/content-grid";
import { MovieDetail } from "@/components/sections/detail";

// UI component imports
import { Button, Card } from "@/components/ui/button";
```

---

## 🔄 API Integration Ready

### **Backend API Endpoints Available:**

- ✅ **Movies:** Popular, top-rated, now-playing, upcoming, details, credits, videos
- ✅ **Series:** Popular, top-rated, on-the-air, details, seasons, episodes
- ✅ **Search:** Multi-search, movie/series search, genres, discovery

### **Frontend Integration Points:**

- ✅ **Mock Data Structure** - Matches backend API response format
- ✅ **Component Props** - Ready for real data replacement
- ✅ **Error Handling** - Structure in place for API errors
- ✅ **Loading States** - Ready for loading indicators

### **Next Steps for API Integration:**

1. Create API hooks using backend endpoints
2. Replace mock data with real API calls
3. Add loading states and error handling
4. Implement image loading for posters and profiles
5. Connect video players for trailers

---

## 🎯 Current Status

### **✅ Completed:**

- **Backend:** Full API with TMDB integration
- **Frontend:** Complete layout and detail pages
- **Navigation:** Dynamic routing and clickable components
- **Design:** Responsive layout with Shadcn components
- **Structure:** Well-organized, modular codebase

### **🔄 Ready for:**

- **API Integration:** Replace mock data with real API calls
- **Styling:** Add colors and visual enhancements
- **Search:** Implement search functionality
- **User Features:** Favorites, watchlist, etc.

---

## 📚 Important Files for AI Reference

### **Backend Documentation:**

- `backend/STREAMORA_BACKEND_SUMMARY.md` - Complete API reference

### **Frontend Structure:**

- `frontend/src/components/sections/` - All content components
- `frontend/src/app/` - Page structure and routing
- `frontend/src/components/layout/` - Layout components

### **Configuration:**

- `backend/tsconfig.json` - TypeScript settings
- `backend/package.json` - Backend dependencies
- `frontend/package.json` - Frontend dependencies

---

**Last Updated:** January 2025
**Project Status:** ✅ Complete wireframe with mock data, ready for API integration
**Repository:** [https://github.com/OfirPatish/Streamora.git](https://github.com/OfirPatish/Streamora.git)
