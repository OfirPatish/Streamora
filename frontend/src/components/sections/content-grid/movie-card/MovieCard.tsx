import { Film, Tv, Play, Plus, Star, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CardTitle, CardSubtitle } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
}

export function MovieCard({
  id,
  title,
  year,
  genre,
  type,
  index,
  rating = 7.5 + index * 0.2, // Mock rating
  isNew = index < 2, // Mock "new" status for first 2 items
  posterPath,
}: MovieCardProps) {
  const Icon = type === "movie" ? Film : Tv;
  const href = type === "movie" ? `/movies/${id}` : `/series/${id}`;
  const posterUrl = getTMDBImageUrl(posterPath || null, "poster", "medium");

  return (
    <div className="w-full group">
      <Card className="cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-xl w-full relative overflow-hidden">
        <CardContent className="p-0 w-full relative">
          {/* Poster/Thumbnail */}
          <div className="poster-aspect border rounded-t-lg flex items-center justify-center w-full bg-gradient-to-br from-gray-800 to-gray-900 group-hover:from-gray-700 group-hover:to-gray-800 transition-all duration-300 relative overflow-hidden">
            {posterUrl ? (
              <Image
                src={posterUrl}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
              />
            ) : (
              <Icon className="h-8 w-8 text-gray-400 group-hover:text-white transition-colors duration-300 z-10" />
            )}

            {/* New Badge */}
            {isNew && (
              <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-600 text-white text-xs z-20">NEW</Badge>
            )}

            {/* Rating Badge */}
            {rating && (
              <Badge
                variant="secondary"
                className="absolute top-2 right-2 bg-black/70 text-white text-xs flex items-center gap-1 z-20"
              >
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {rating.toFixed(1)}
              </Badge>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-10">
              <div className="flex gap-2">
                <Button size="sm" className="bg-white text-black hover:bg-gray-200">
                  <Play className="h-4 w-4 mr-1" />
                  Trailer
                </Button>
                <Button size="sm" variant="secondary" className="bg-gray-800/80 hover:bg-gray-700">
                  <Plus className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary" className="bg-gray-800/80 hover:bg-gray-700">
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Card Content */}
          <Link href={href} className="block">
            <div className="p-3">
              <CardTitle className="mb-1 group-hover:text-white transition-colors">{title}</CardTitle>
            </div>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
