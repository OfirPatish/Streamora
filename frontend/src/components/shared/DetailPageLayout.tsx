"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, Play, ExternalLink, Users, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// ============================================================================
// INTERFACES
// ============================================================================

interface DetailPageLayoutProps {
  type: "movie" | "series";
  title: string;
  overview?: string;
  backdropPath?: string;
  videos?: Array<{ key: string; name: string; type: string; site: string }>;
  homepage?: string;
  onVideoSelect?: (video: { key: string; name: string; type: string; site: string }) => void;
  onWatchlistAdd?: () => void;
  onRefetch?: () => void;
  isRefetching?: boolean;
  children: ReactNode;
  className?: string;
  // Sidebar content
  essentialInfo?: ReactNode;
  productionInfo?: ReactNode;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function DetailPageLayout({
  type,
  title,
  overview,
  backdropPath,
  homepage,
  videos,
  children,
  onVideoSelect,
  onWatchlistAdd,
  onRefetch,
  isRefetching,
  className = "",
  essentialInfo,
  productionInfo,
}: DetailPageLayoutProps) {
  const contentType = type === "movie" ? "Movie" : "TV Show";
  const hasVideos = videos && videos.length > 0;

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {/* Compact Hero Section */}
      <div className="relative overflow-hidden">
        {/* Backdrop Image with Subtle Overlay */}
        {backdropPath && (
          <div className="absolute inset-0">
            <img
              src={`https://image.tmdb.org/t/p/original${backdropPath}`}
              alt={title}
              className="w-full h-full object-cover"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/70" />
          </div>
        )}

        {/* Content Overlay */}
        <div className="relative z-10 px-6 py-12 lg:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              {/* Content Type Badge */}
              <div className="mb-4">
                <Badge
                  variant="secondary"
                  className="px-3 py-1 bg-primary/10 text-primary border-primary/20 text-sm font-medium"
                >
                  {contentType}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight">{title}</h1>

              {/* Overview */}
              {overview && (
                <p className="text-base lg:text-lg text-white/90 mb-6 max-w-2xl leading-relaxed">{overview}</p>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {hasVideos && onVideoSelect && (
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-base font-medium shadow-lg transition-all duration-200 rounded-lg"
                    onClick={() => onVideoSelect(videos[0])}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Trailer
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/30 hover:border-white/50 hover:bg-white/10 text-white px-6 py-3 text-base font-medium transition-all duration-200 rounded-lg"
                  onClick={onWatchlistAdd}
                >
                  <Bookmark className="w-5 h-5 mr-2" />
                  Add to Watchlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Main Content - Vertical Stack Layout */}
          <div className="space-y-6">
            {/* Essential Info Section */}
            {essentialInfo && (
              <section className="bg-muted/30 rounded-xl border border-border/50 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Essential Info</h2>
                  <Badge
                    variant="secondary"
                    className="px-3 py-1 bg-primary/10 text-primary border-primary/20 text-sm font-medium"
                  >
                    {contentType}
                  </Badge>
                </div>
                {essentialInfo}
              </section>
            )}

            {/* Production Info Section */}
            {productionInfo && (
              <section className="bg-muted/30 rounded-xl border border-border/50 p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">Production</h2>
                {productionInfo}
              </section>
            )}

            {/* Main Content (Cast, Videos, etc.) */}
            <div className="space-y-6">{children}</div>

            {/* Quick Actions Section */}
            <section className="bg-muted/30 rounded-xl border border-border/50 p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {homepage && (
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={homepage} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Official Site
                    </a>
                  </Button>
                )}

                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Share
                </Button>

                {onRefetch && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={onRefetch}
                    disabled={isRefetching}
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isRefetching ? "animate-spin" : ""}`} />
                    {isRefetching ? "Refreshing..." : "Refresh Data"}
                  </Button>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
