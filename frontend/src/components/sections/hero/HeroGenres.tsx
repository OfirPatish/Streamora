import { FeaturedContent } from "./types";

interface HeroGenresProps {
  genres: FeaturedContent["genre"];
}

export function HeroGenres({ genres }: HeroGenresProps) {
  return (
    <div className="flex gap-2">
      {genres.map((genre) => (
        <span key={genre} className="text-xs px-2 py-1 bg-gray-800/50 rounded-full text-gray-300">
          {genre}
        </span>
      ))}
    </div>
  );
}
