import { MovieCard } from "./movie-card";

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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {showViewAll && (
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">View All</button>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4 w-full">
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
