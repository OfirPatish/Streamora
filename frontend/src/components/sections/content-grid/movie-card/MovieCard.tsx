import { Film, Tv, Play, Plus, Star, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CardTitle, CardSubtitle } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface MovieCardProps {
  id: number;
  title: string;
  year: string;
  genre: string;
  type: "movie" | "series";
  index: number;
  rating?: number;
  progress?: number; // 0-100 for continue watching
  isNew?: boolean;
}

export function MovieCard({
  id,
  title,
  year,
  genre,
  type,
  index,
  rating = 7.5 + index * 0.2, // Mock rating
  progress,
  isNew = index < 2, // Mock "new" status for first 2 items
}: MovieCardProps) {
  const Icon = type === "movie" ? Film : Tv;
  const href = type === "movie" ? `/movies/${id}` : `/series/${id}`;

  return (
    <div className="w-full group">
      <Card className="cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-xl w-full relative overflow-hidden">
        <CardContent className="p-0 w-full relative">
          {/* Poster/Thumbnail */}
          <div className="poster-aspect border rounded-t-lg flex items-center justify-center w-full bg-gradient-to-br from-gray-800 to-gray-900 group-hover:from-gray-700 group-hover:to-gray-800 transition-all duration-300 relative">
            <Icon className="h-8 w-8 text-gray-400 group-hover:text-white transition-colors duration-300" />

            {/* New Badge */}
            {isNew && (
              <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-600 text-white text-xs">NEW</Badge>
            )}

            {/* Rating Badge */}
            {rating && (
              <Badge
                variant="secondary"
                className="absolute top-2 right-2 bg-black/70 text-white text-xs flex items-center gap-1"
              >
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {rating.toFixed(1)}
              </Badge>
            )}

            {/* Progress Bar for Continue Watching */}
            {progress && progress > 0 && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                <div className="h-full bg-red-600 transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <div className="flex gap-2">
                <Button size="sm" className="bg-white text-black hover:bg-gray-200">
                  <Play className="h-4 w-4 mr-1" />
                  Play
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
              <CardTitle className="mb-1 group-hover:text-white transition-colors">
                {title} {index + 1}
              </CardTitle>
              <CardSubtitle className="flex items-center justify-between">
                <span>
                  {year} • {genre}
                </span>
                {type === "series" && (
                  <span className="text-xs text-muted-foreground">{Math.floor(Math.random() * 5) + 1} Seasons</span>
                )}
              </CardSubtitle>
            </div>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
