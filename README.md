# 🎬 Streamora

A content discovery platform similar to Stremio/TMDB, focusing on movie and TV series information, trailers, and recommendations. Built with a Node.js/Express/TypeScript backend and Next.js frontend, integrated with The Movie Database (TMDB) API.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- TMDB API key (for backend)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/OfirPatish/Streamora.git
   cd Streamora
   ```

2. **Install all dependencies**

   ```bash
   npm run install:all
   ```

3. **Set up environment variables**

   ```bash
   # Backend
   cp backend/env.example backend/.env
   # Edit backend/.env and add your TMDB_API_KEY
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

This will start both:

- **Backend**: http://localhost:3001
- **Frontend**: http://localhost:3000

## 📁 Project Structure

```
streamora/
├── backend/          # Node.js/Express/TypeScript API
├── frontend/         # Next.js 14 App Router
├── package.json      # Root scripts and workspace config
└── README.md
```

## 🛠️ Available Scripts

### Root Level Commands

- `npm run dev` - Start both backend and frontend in development mode
- `npm run build` - Build both backend and frontend for production
- `npm run start` - Start both services in production mode
- `npm run install:all` - Install dependencies for all packages
- `npm run clean` - Clean all node_modules and build artifacts
- `npm run lint` - Run linting for both backend and frontend

### Individual Service Commands

- `npm run dev:backend` - Start only backend development server
- `npm run dev:frontend` - Start only frontend development server
- `npm run build:backend` - Build only backend
- `npm run build:frontend` - Build only frontend

## 🔧 Development

### Backend Development

- **Port**: 3001
- **API**: TMDB integration with 20+ endpoints
- **Features**: Movies, TV series, search, discovery

### Frontend Development

- **Port**: 3000
- **Framework**: Next.js 14 with App Router
- **UI**: Shadcn/ui components with Tailwind CSS
- **Features**: Responsive design, dynamic routing, content grids

## 📚 Documentation

- [Backend API Documentation](./backend/STREAMORA_BACKEND_SUMMARY.md)
- [AI Reference Guide](./STREAMORA_AI_REFERENCE.md)

## 🎯 Features

### ✅ Completed

- Full backend API with TMDB integration
- Complete frontend layout and detail pages
- Dynamic routing for movies and series
- Responsive design with Shadcn components
- Root-level development scripts

### 🔄 Ready for

- API integration (replace mock data)
- Search functionality
- User features (favorites, watchlist)
- Visual enhancements and styling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details
