# 🚀 Streamora Backend - Quick Start Guide

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- TMDB API key (free at [themoviedb.org](https://www.themoviedb.org/settings/api))

## 🛠️ Quick Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Build the project**

   ```bash
   npm run build
   ```

3. **Get your TMDB API key**

   - Go to [themoviedb.org](https://www.themoviedb.org/settings/api)
   - Create a free account
   - Request an API key

4. **Configure environment**

   ```bash
   # Copy the example file
   cp env.example .env

   # Edit .env and add your TMDB API key
   TMDB_API_KEY=your_actual_api_key_here
   ```

5. **Start the server**
   ```bash
   npm start
   ```

The server will start on `http://localhost:3001`

## 🧪 Test the API

Run the test script to verify everything works:

```bash
node test-api.js
```

## 📚 Available Endpoints

### Health & Info

- `GET /health` - Server health check
- `GET /api` - API information

### Movies

- `GET /api/movies/popular` - Popular movies
- `GET /api/movies/top-rated` - Top rated movies
- `GET /api/movies/now-playing` - Now playing movies
- `GET /api/movies/upcoming` - Upcoming movies
- `GET /api/movies/:id` - Movie details

### Series

- `GET /api/series/popular` - Popular series
- `GET /api/series/top-rated` - Top rated series
- `GET /api/series/on-the-air` - On the air series
- `GET /api/series/airing-today` - Airing today series
- `GET /api/series/:id` - Series details

### Search

- `GET /api/search/multi?query=<term>` - Multi-search
- `GET /api/search/movies?query=<term>` - Search movies
- `GET /api/search/series?query=<term>` - Search series
- `GET /api/search/genres/movies` - Movie genres
- `GET /api/search/genres/series` - Series genres

## 🔧 Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## 🎯 Next Steps

1. **Frontend Development**: Create a React/Vue/Angular frontend
2. **Database Integration**: Add user management and favorites
3. **Authentication**: Implement user authentication
4. **Caching**: Frontend handles caching (no backend caching needed)
5. **Deployment**: Deploy to cloud platforms

## 🆘 Troubleshooting

### Common Issues

1. **"TMDB API key not configured"**

   - Make sure you've added your TMDB API key to the `.env` file

2. **"Port already in use"**

   - Change the PORT in your `.env` file or kill the process using port 3001

3. **"Module not found" errors**

   - Run `npm install` to install dependencies
   - Run `npm run build` to compile TypeScript

4. **API returns errors**
   - Check your TMDB API key is valid
   - Verify your internet connection
   - Check the TMDB API status

## 📞 Support

If you encounter any issues:

1. Check the [README.md](README.md) for detailed documentation
2. Verify your TMDB API key is working
3. Check the server logs for error messages
