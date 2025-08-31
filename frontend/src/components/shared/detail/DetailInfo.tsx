"use client";

import { Badge } from "@/components/ui/badge";
import { Star, Calendar, Clock, Users, Award, Globe, Info } from "lucide-react";

// ============================================================================
// INTERFACES
// ============================================================================

interface DetailInfoProps {
  genres?: Array<{ id: number; name: string }>;
  releaseDate?: string;
  runtime?: number;
  status?: string;
  voteAverage?: number;
  voteCount?: number;
  type: "movie" | "series";
  // Series-specific props
  numberOfSeasons?: number;
  numberOfEpisodes?: number;
  firstAirDate?: string;
  lastAirDate?: string;
  networks?: Array<{ id: number; name: string; logo_path?: string | null }>;
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
  voteCount,
  type,
  numberOfSeasons,
  numberOfEpisodes,
  firstAirDate,
  lastAirDate,
  networks,
}: DetailInfoProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "TBA";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatRuntime = (minutes?: number) => {
    if (!minutes) return "TBA";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatVoteAverage = (average?: number) => {
    if (!average) return "N/A";
    return average.toFixed(1);
  };

  return (
    <section className="bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl p-8 border border-border/50">
      <div className="flex items-center gap-3 mb-8">
        <Info className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Information</h2>
      </div>

      <div className="space-y-6">
        {/* Genres */}
        {genres && genres.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {genres.slice(0, 4).map((genre) => (
                <Badge key={genre.id} variant="secondary" className="text-sm font-medium px-3 py-1">
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Information List */}
        <div className="space-y-4">
          {/* Release Information */}
          {type === "movie" ? (
            <>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Release Date</span>
                </div>
                <span className="text-sm text-muted-foreground">{formatDate(releaseDate)}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Runtime</span>
                </div>
                <span className="text-sm text-muted-foreground">{formatRuntime(runtime)}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">First Air Date</span>
                </div>
                <span className="text-sm text-muted-foreground">{formatDate(firstAirDate)}</span>
              </div>
              {lastAirDate && (
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Last Air Date</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{formatDate(lastAirDate)}</span>
                </div>
              )}
            </>
          )}

          {/* Series-specific information */}
          {type === "series" && numberOfSeasons && (
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Award className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Seasons</span>
              </div>
              <span className="text-sm text-muted-foreground">{numberOfSeasons}</span>
            </div>
          )}

          {type === "series" && numberOfEpisodes && (
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Episodes</span>
              </div>
              <span className="text-sm text-muted-foreground">{numberOfEpisodes}</span>
            </div>
          )}

          {/* Status */}
          {status && (
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                </div>
                <span className="text-sm font-medium">Status</span>
              </div>
              <span className="text-sm text-muted-foreground">{status}</span>
            </div>
          )}

          {/* Rating */}
          {voteAverage && (
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Star className="w-4 h-4 fill-current text-yellow-500" />
                <span className="text-sm font-medium">Rating</span>
              </div>
              <span className="text-sm text-muted-foreground">{formatVoteAverage(voteAverage)}/10</span>
            </div>
          )}

          {/* Votes */}
          {voteCount && (
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Votes</span>
              </div>
              <span className="text-sm text-muted-foreground">{voteCount.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Networks (Series only) */}
        {type === "series" && networks && networks.length > 0 && (
          <div className="pt-2">
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <Globe className="w-4 h-4" />
              <h3 className="text-sm font-semibold uppercase tracking-wide">Networks</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {networks.map((network) => (
                <Badge key={network.id} variant="outline" className="text-sm font-medium">
                  {network.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
