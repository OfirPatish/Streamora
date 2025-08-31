"use client";

import { Badge } from "@/components/ui/badge";
import { Star, Calendar, Clock, Award, Users } from "lucide-react";

// ============================================================================
// INTERFACES
// ============================================================================

interface DetailInfoProps {
  genres?: Array<{ id: number; name: string }>;
  releaseDate?: string;
  runtime?: number;
  status?: string;
  voteAverage?: number;
  type: "movie" | "series";
  // Series-specific props
  numberOfSeasons?: number;
  numberOfEpisodes?: number;
  firstAirDate?: string;
}

// ============================================================================
// DETAIL INFO COMPONENT
// ============================================================================

export function DetailInfo({
  genres,
  releaseDate,
  runtime,
  status,
  voteAverage,
  type,
  numberOfSeasons,
  numberOfEpisodes,
  firstAirDate,
}: DetailInfoProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString || dateString === "Unknown" || dateString === "TBA") return null;
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return null;
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
    } catch {
      return null;
    }
  };

  const formatRuntime = (minutes?: number) => {
    if (!minutes || minutes === 0) return null;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Only show essential data
  const hasGenres = genres && genres.length > 0;
  const hasReleaseInfo =
    type === "movie"
      ? (releaseDate && formatDate(releaseDate)) || (runtime && formatRuntime(runtime))
      : firstAirDate && formatDate(firstAirDate);
  const hasSeriesInfo = type === "series" && (numberOfSeasons || numberOfEpisodes);
  const hasRating = voteAverage && voteAverage > 0;
  const hasStatus = status && status !== "Unknown" && status !== "TBA" && status !== "0";

  // If we don't have any essential data, don't render
  if (!hasGenres && !hasReleaseInfo && !hasSeriesInfo && !hasRating && !hasStatus) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Genres - Always show if available */}
      {hasGenres && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Genres</h3>
          <div className="flex flex-wrap gap-2">
            {genres
              .filter((genre) => genre.name && genre.name.trim() !== "")
              .slice(0, 5)
              .map((genre) => (
                <Badge
                  key={genre.id}
                  variant="secondary"
                  className="text-sm font-medium px-3 py-1.5 bg-primary/10 text-primary border-primary/20"
                >
                  {genre.name}
                </Badge>
              ))}
            {genres.filter((genre) => genre.name && genre.name.trim() !== "").length > 5 && (
              <Badge variant="outline" className="text-sm font-medium text-muted-foreground px-3 py-1.5">
                +{genres.filter((genre) => genre.name && genre.name.trim() !== "").length - 5}
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Key Information Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Release/Runtime Information */}
        {hasReleaseInfo && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Release Info</h3>
            <div className="space-y-3">
              {type === "movie" ? (
                <>
                  {releaseDate && formatDate(releaseDate) && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Release Date</p>
                        <p className="text-sm text-muted-foreground">{formatDate(releaseDate)}</p>
                      </div>
                    </div>
                  )}
                  {runtime && formatRuntime(runtime) && (
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Runtime</p>
                        <p className="text-sm text-muted-foreground">{formatRuntime(runtime)}</p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {firstAirDate && formatDate(firstAirDate) && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">First Air Date</p>
                        <p className="text-sm text-muted-foreground">{formatDate(firstAirDate)}</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Series info or Rating */}
        {(hasSeriesInfo || hasRating) && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {type === "series" ? "Series Info" : "Rating"}
            </h3>
            <div className="space-y-3">
              {type === "series" ? (
                <>
                  {numberOfSeasons && numberOfSeasons > 0 && (
                    <div className="flex items-center gap-3">
                      <Award className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Seasons</p>
                        <p className="text-sm text-muted-foreground">{numberOfSeasons}</p>
                      </div>
                    </div>
                  )}

                  {numberOfEpisodes && numberOfEpisodes > 0 && (
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Episodes</p>
                        <p className="text-sm text-muted-foreground">{numberOfEpisodes}</p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                hasRating && (
                  <div className="flex items-center gap-3">
                    <Star className="w-4 h-4 fill-current text-yellow-500" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Rating</p>
                      <p className="text-sm text-muted-foreground">{voteAverage?.toFixed(1)}/10</p>
                    </div>
                  </div>
                )
              )}

              {hasStatus && (
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Status</p>
                    <p className="text-sm text-muted-foreground">{status}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
