import { ContentGrid } from "./ContentGrid";
import { Typography } from "@/components/ui/typography";

// Mock data based on backend API endpoints
const mockTrendingMovies = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: "Trending Movie",
  year: "2024",
  genre: "Action",
  type: "movie" as const,
  progress: i === 1 ? 65 : undefined, // Continue watching for second item
}));

const mockPopularMovies = Array.from({ length: 6 }, (_, i) => ({
  id: i + 101,
  title: "Popular Movie",
  year: "2024",
  genre: "Drama",
  type: "movie" as const,
}));

const mockNowPlayingMovies = Array.from({ length: 6 }, (_, i) => ({
  id: i + 201,
  title: "Now Playing",
  year: "2024",
  genre: "Comedy",
  type: "movie" as const,
}));

const mockUpcomingMovies = Array.from({ length: 6 }, (_, i) => ({
  id: i + 301,
  title: "Upcoming Movie",
  year: "2024",
  genre: "Sci-Fi",
  type: "movie" as const,
}));

const mockPopularSeries = Array.from({ length: 6 }, (_, i) => ({
  id: i + 401,
  title: "Popular Series",
  year: "2024",
  genre: "Drama",
  type: "series" as const,
}));

const mockTopRatedSeries = Array.from({ length: 6 }, (_, i) => ({
  id: i + 501,
  title: "Top Rated Series",
  year: "2024",
  genre: "Thriller",
  type: "series" as const,
}));

const mockOnTheAirSeries = Array.from({ length: 6 }, (_, i) => ({
  id: i + 601,
  title: "On The Air",
  year: "2024",
  genre: "Comedy",
  type: "series" as const,
}));

export function ContentSections() {
  return (
    <section className="space-y-8 w-full px-6">
      {/* Movies Section */}
      <div className="space-y-8">
        <Typography variant="h3" className="text-muted-foreground">
          Movies
        </Typography>

        <ContentGrid title="Trending Now" items={mockTrendingMovies} />

        <ContentGrid title="Popular Movies" items={mockPopularMovies} />

        <ContentGrid title="Now Playing" items={mockNowPlayingMovies} />

        <ContentGrid title="Upcoming Releases" items={mockUpcomingMovies} />
      </div>

      {/* TV Series Section */}
      <div className="space-y-8">
        <Typography variant="h3" className="text-muted-foreground">
          TV Series
        </Typography>

        <ContentGrid title="Popular TV Series" items={mockPopularSeries} />

        <ContentGrid title="Top Rated Series" items={mockTopRatedSeries} />

        <ContentGrid title="On The Air" items={mockOnTheAirSeries} />
      </div>
    </section>
  );
}
