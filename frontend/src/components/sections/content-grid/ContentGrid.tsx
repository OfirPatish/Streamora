import { MovieCard } from "./movie-card";
import { SectionTitle, Typography } from "@/components/ui/typography";

interface ContentGridProps {
  title: string;
  items: Array<{
    id: number;
    title: string;
    year: string;
    genre: string;
    type: "movie" | "series";
  }>;
  showViewAll?: boolean;
}

export function ContentGrid({ title, items, showViewAll = true }: ContentGridProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <SectionTitle className="mb-0">{title}</SectionTitle>
        {showViewAll && (
          <Typography variant="link" as="button" className="hover:text-primary transition-colors">
            View All
          </Typography>
        )}
      </div>
      <div className="content-grid">
        {items.map((item, index) => (
          <MovieCard
            key={item.id}
            id={item.id}
            title={item.title}
            year={item.year}
            genre={item.genre}
            type={item.type}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
