import { Film, Tv } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getTMDBImageUrl } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

import { MediaCardProps } from "../types";

export function MediaCard({
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
  showViewCount = false,
  showDuration = false,
  showReleaseDate = false,
  showRating = false,
  showEpisodeCount = false,
  viewCount,
  duration,
  releaseDate,
  episodeCount,
}: MediaCardProps) {
  const Icon = type === "movie" ? Film : Tv;
  const href = type === "movie" ? `/movies/${id}` : `/series/${id}`;
  const posterUrl = getTMDBImageUrl(posterPath || null, "poster", "medium");

  return (
    <div className="w-full group">
      <Link href={href} className="block" suppressHydrationWarning>
        <Card className="cursor-pointer transition-all duration-300 w-full relative overflow-hidden bg-transparent border-transparent p-0">
          <CardContent className="p-0 w-full relative">
            {/* Poster/Thumbnail - Border on Hover */}
            <div className="poster-aspect flex items-center justify-center w-full bg-muted transition-all duration-300 relative overflow-hidden rounded-lg border-2 border-transparent hover:border-primary/60 hover:shadow-lg">
              {posterPath && posterUrl ? (
                <Image
                  src={posterUrl}
                  alt={title}
                  fill
                  priority={priority}
                  className="object-cover rounded-lg"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                />
              ) : (
                <Icon className="h-12 w-12 text-muted-foreground" />
              )}
            </div>

            {/* Title - Centered */}
            <div className="mt-2">
              <h3 className="text-sm font-semibold text-center line-clamp-2 leading-tight px-1 text-foreground">
                {title}
              </h3>

              {/* Additional Info */}
              <div className="mt-2 space-y-1">
                {/* View Count */}
                {showViewCount && viewCount && (
                  <div className="text-xs text-muted-foreground text-center">
                    {viewCount >= 1000
                      ? `${(viewCount / 1000).toFixed(1)}K`
                      : viewCount}{" "}
                    views
                  </div>
                )}

                {/* Duration */}
                {showDuration && duration && (
                  <div className="text-xs text-muted-foreground text-center">
                    {duration}
                  </div>
                )}

                {/* Release Date */}
                {showReleaseDate && releaseDate && (
                  <div className="text-xs text-muted-foreground text-center">
                    Release on {releaseDate}
                  </div>
                )}

                {/* Rating */}
                {showRating && rating && (
                  <div className="text-xs text-muted-foreground text-center">
                    ⭐ {rating.toFixed(1)}/5 stars
                  </div>
                )}

                {/* Episode Count */}
                {showEpisodeCount && episodeCount && (
                  <div className="text-xs text-muted-foreground text-center">
                    {episodeCount} episodes
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
