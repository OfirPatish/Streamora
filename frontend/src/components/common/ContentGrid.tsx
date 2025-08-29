import { MovieCard } from "./MovieCard";
import { MovieCardSkeleton } from "./Skeleton";
import { SectionTitle, Typography } from "@/components/ui/typography";

interface ContentGridProps {
  title?: string;
  items: Array<{
    id: number;
    title: string;
    year: string;
    genre: string;
    type: "movie" | "series";
    index: number;
    rating?: number;
    isNew?: boolean;
    posterPath?: string | null;
  }>;
  showViewAll?: boolean;
  loading?: boolean;
  error?: string | null;
}

export function ContentGrid({ title, items, showViewAll = true, loading = false, error = null }: ContentGridProps) {
  return (
    <div className="w-full">
      {title && (
        <div className="flex items-center justify-between mb-6">
          <SectionTitle className="mb-0">{title}</SectionTitle>
          {showViewAll && !loading && !error && (
            <Typography variant="link" as="button" className="hover:text-primary transition-colors">
              View All
            </Typography>
          )}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="content-grid">
          <div className="col-span-full flex items-center justify-center py-8">
            <Typography variant="muted" className="text-destructive">
              Failed to load {title?.toLowerCase() || "content"}: {error}
            </Typography>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="content-grid">
          {Array.from({ length: 20 }, (_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Content State */}
      {!loading && !error && (
        <div className="content-grid">
          {items.map((item, index) => (
            <MovieCard
              key={item.id}
              id={item.id}
              title={item.title}
              year={item.year}
              genre={item.genre}
              type={item.type}
              index={item.index}
              rating={item.rating}
              isNew={item.isNew}
              posterPath={item.posterPath}
              priority={index < 6} // Prioritize first 6 visible cards for LCP
            />
          ))}
        </div>
      )}
    </div>
  );
}
