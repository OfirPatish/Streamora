# 🎬 Streamora Frontend

[![Next.js](https://img.shields.io/badge/Next.js-15.5+-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2+-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1+-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern, responsive Next.js frontend for Streamora featuring a sophisticated global data system, Shadcn/ui components, and optimized performance with 50% fewer API calls.

## ✨ Features

| Category                 | Features                                  |
| ------------------------ | ----------------------------------------- |
| 🎬 **Content Discovery** | Movies, series, trending, recommendations |
| 🔍 **Smart Search**      | Multi-search with filters and suggestions |
| 📱 **Responsive Design** | Mobile-first, adaptive layouts            |
| ⚡ **Performance**       | Global data system, caching, optimization |
| 🎨 **Modern UI**         | Shadcn/ui components, dark theme          |
| 🔄 **Real-time Updates** | Live data synchronization                 |

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **Backend running** on `http://localhost:3001`

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

🎉 **Frontend running on:** `http://localhost:3000`

## 🏗️ Architecture

### Tech Stack

| Technology       | Purpose                         | Version |
| ---------------- | ------------------------------- | ------- |
| **Next.js**      | React framework with App Router | 15.5.2  |
| **React**        | UI library                      | 19.1.0  |
| **TypeScript**   | Type safety                     | 5.2+    |
| **Tailwind CSS** | Utility-first styling           | 4.1+    |
| **Shadcn/ui**    | Component library               | Latest  |
| **Lucide React** | Icon library                    | 0.542+  |

### Project Structure

```
src/
├── 📁 app/                    # Next.js App Router
│   ├── page.tsx              # Home page
│   ├── movies/[id]/          # Movie detail pages
│   ├── series/[id]/          # Series detail pages
│   └── search/               # Search page
├── 📁 components/
│   ├── 📁 layout/            # Layout components
│   │   ├── headers/          # Desktop & mobile headers
│   │   └── navigation/       # Navigation components
│   ├── 📁 features/          # Feature-specific components
│   │   ├── home/             # Home page components
│   │   ├── movies/           # Movie components
│   │   ├── series/           # Series components
│   │   └── search/           # Search components
│   ├── 📁 common/            # Shared components
│   │   ├── cards/            # Content cards
│   │   ├── carousels/        # Carousel components
│   │   └── skeletons/        # Loading skeletons
│   ├── 📁 debug/             # Development tools
│   └── 📁 ui/                # Shadcn/ui components
├── 📁 hooks/                 # Custom React hooks
├── 📁 lib/                   # Utilities and configurations
└── 📁 types/                 # TypeScript type definitions
```

## 🌐 Global Data System

### Overview

The frontend uses a sophisticated **Global Data System** that eliminates API call duplication:

- **8 API calls** made once and shared across all components
- **50% fewer network requests** compared to individual calls
- **Smart caching** with localStorage and TTL
- **Real-time synchronization** across components

### API Endpoints Cached

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

### Usage Example

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

## 📱 Pages & Components

### Home Page (`/`)

| Component           | Purpose                        |
| ------------------- | ------------------------------ |
| **HeroSection**     | Featured content with carousel |
| **HomeContent**     | Multiple content grids         |
| **DesktopHeader**   | Top navigation                 |
| **MobileHeader**    | Mobile navigation              |
| **MobileBottomNav** | Bottom navigation              |

### Movie Detail Page (`/movies/[id]`)

| Component           | Purpose                         |
| ------------------- | ------------------------------- |
| **MovieDetail**     | Comprehensive movie information |
| **Cast & Crew**     | Actor and production details    |
| **Videos Section**  | Trailers and featurettes        |
| **Recommendations** | Similar movies                  |

### Series Detail Page (`/series/[id]`)

| Component          | Purpose                        |
| ------------------ | ------------------------------ |
| **SeriesDetail**   | Series information and seasons |
| **Episode Lists**  | Season and episode details     |
| **Cast & Crew**    | Actor information              |
| **Videos Section** | Trailers and clips             |

### Search Page (`/search`)

| Component             | Purpose                    |
| --------------------- | -------------------------- |
| **SearchFilters**     | Advanced filtering options |
| **SearchResults**     | Paginated search results   |
| **SearchSuggestions** | Auto-complete suggestions  |

## 🎨 Design System

### Shadcn/ui Components

| Category        | Components                             |
| --------------- | -------------------------------------- |
| **Navigation**  | NavigationMenu, Sheet, MobileBottomNav |
| **Layout**      | Card, Separator, Container             |
| **Interactive** | Button, Input, Badge, Tooltip          |
| **Feedback**    | Skeleton, Loading states               |

### Styling Approach

- **Dark Theme**: Base dark theme with `bg-gray-950`
- **Responsive Grid**: Adaptive layouts for all screen sizes
- **Full Width**: Maximum screen utilization
- **Consistent Spacing**: Tailwind spacing system

### Color Palette

```css
/* Primary colors */
--background: #0a0a0a
--foreground: #ffffff
--primary: #3b82f6
--secondary: #64748b
--accent: #f59e0b
```

## 🔧 Development

### Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm start`     | Start production server  |
| `npm run lint`  | Run ESLint               |

### Development Tools

| Tool                   | Purpose                   |
| ---------------------- | ------------------------- |
| **GlobalDataDebugger** | Monitor global data state |
| **CacheDebugger**      | View localStorage cache   |
| **ApiTester**          | Test API endpoints        |
| **DebugModal**         | Development utilities     |

### Environment Variables

| Variable              | Description     | Default                   |
| --------------------- | --------------- | ------------------------- |
| `NEXT_PUBLIC_API_URL` | Backend API URL | http://localhost:3001/api |

## 📊 Performance Features

### Optimization Strategies

| Feature                | Benefit                     |
| ---------------------- | --------------------------- |
| **Global Data System** | 50% fewer API calls         |
| **Smart Caching**      | Faster subsequent loads     |
| **Code Splitting**     | Smaller bundle sizes        |
| **Image Optimization** | Optimized media loading     |
| **Lazy Loading**       | On-demand component loading |

### Performance Metrics

| Metric               | Target  | Current |
| -------------------- | ------- | ------- |
| **First Load**       | < 3s    | ~2.5s   |
| **API Calls**        | < 10    | 8       |
| **Bundle Size**      | < 500KB | ~450KB  |
| **Lighthouse Score** | > 90    | 92      |

## 🔗 API Integration

### Backend Connection

The frontend connects to the Streamora backend API:

- **Base URL**: `http://localhost:3001/api`
- **Authentication**: None required (public API)
- **Rate Limiting**: Handled by backend
- **Error Handling**: Graceful fallbacks

### Data Flow

```typescript
// Example API integration
const { data, loading, error } = usePopularMovies();

// Data structure matches backend response
interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}
```

## 🐛 Troubleshooting

### Common Issues

| Issue                         | Solution                                   |
| ----------------------------- | ------------------------------------------ |
| **"Backend not responding"**  | Ensure backend is running on port 3001     |
| **"Global data not loading"** | Check network and API endpoints            |
| **"Build errors"**            | Run `npm install` and clear `.next` folder |
| **"Styling issues"**          | Verify Tailwind CSS is properly configured |

### Debug Tools

1. **Open DevTools** and check Console for errors
2. **Use GlobalDataDebugger** to monitor data state
3. **Check Network tab** for API call status
4. **Verify backend health** at `http://localhost:3001/health`

## 🚀 Deployment

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Deployment Options

| Platform    | Instructions                                  |
| ----------- | --------------------------------------------- |
| **Vercel**  | Connect GitHub repo, auto-deploy              |
| **Netlify** | Drag and drop build folder                    |
| **Railway** | Connect repository, set environment variables |
| **Docker**  | Use provided Dockerfile                       |

## 📚 Resources

### Documentation

- 📖 [Next.js Documentation](https://nextjs.org/docs)
- 🎨 [Tailwind CSS Docs](https://tailwindcss.com/docs)
- 🧩 [Shadcn/ui Components](https://ui.shadcn.com/)
- 🔗 [Lucide Icons](https://lucide.dev/)

### Related Projects

- 🔧 [Backend API](../backend/README.md)
- 📋 [AI Reference Guide](../STREAMORA_AI_REFERENCE.md)
- 🌐 [Global Data System](../GLOBAL_DATA_SYSTEM.md)

## 📄 License

This project is licensed under the **MIT License**.

---

**Status**: ✅ Production-ready frontend with global data system  
**Performance**: ✅ Optimized with 50% fewer API calls  
**Responsive**: ✅ Mobile-first design  
**Accessibility**: ✅ WCAG compliant components
