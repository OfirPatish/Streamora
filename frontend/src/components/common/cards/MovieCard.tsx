import { Film, Tv } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/typography";
import { getTMDBImageUrl } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

interface MovieCardProps {
  id: number;
  title: string;
  year: string;
  genre: string;
  type: "movie" | "series";
  index: number;
  rating?: number;
  isNew?: boolean;
  posterPath?: string | null;
  priority?: boolean;
}

export function MovieCard({
  id,
  title,
  year,
  genre,
  type,
  index,
  rating,
  isNew,
  posterPath,
  priority = false,
}: MovieCardProps) {
  const Icon = type === "movie" ? Film : Tv;
  const href = type === "movie" ? `/movies/${id}` : `/series/${id}`;
  const posterUrl = getTMDBImageUrl(posterPath || null, "poster", "medium");

  return (
    <div className="w-full group">
      {/* Card - No Border */}
      <Card className="cursor-pointer transition-all duration-300 w-full relative overflow-hidden bg-transparent border-transparent p-0">
        <CardContent className="p-0 w-full relative">
          {/* Poster/Thumbnail - Border on Hover */}
          <div className="poster-aspect flex items-center justify-center w-full bg-gradient-to-br from-gray-800 to-gray-900 transition-all duration-300 relative overflow-hidden rounded-lg border border-transparent hover:border-gray-600">
            {posterUrl ? (
              <Image
                src={posterUrl}
                alt={title}
                fill
                priority={priority}
                className="object-cover rounded-lg"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
              />
            ) : (
              <Icon className="h-12 w-12 text-gray-400" />
            )}
          </div>

          {/* Title - Centered */}
          <Link href={href} className="block mt-2">
            <CardTitle className="text-sm font-semibold text-center line-clamp-2 leading-tight px-1">{title}</CardTitle>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
