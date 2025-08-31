"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Play, Bookmark } from "lucide-react";
import { MovieDetails } from "../types";
import { DetailBanner, DetailInfo, DetailCast, DetailProduction } from "@/components/shared";

import { VideoModal } from "@/components/shared";
import { PageTemplate } from "@/components/layout/PageTemplate";
import { DetailContentWrapper } from "@/components/layout/DetailContentWrapper";

// ============================================================================
// INTERFACES
// ============================================================================

import { MovieDetailProps, Video } from "../types";

// ============================================================================
// MOVIE DETAIL COMPONENT
// ============================================================================

export function MovieDetail({ id, data, loading, error }: MovieDetailProps) {
  const [selectedVideo, setSelectedVideo] = useState<{ key: string; name: string } | null>(null);

  // Use passed data instead of hook
  const movie = data;

  // Error state
  if (error || !movie) {
    return (
      <PageTemplate>
        <DetailContentWrapper error="Failed to load movie details">
          <div className="text-center py-16">
            <div className="text-destructive mb-4 text-lg font-medium">Failed to load movie details</div>
            <div className="text-muted-foreground">Movie ID: {id}</div>
          </div>
        </DetailContentWrapper>
      </PageTemplate>
    );
  }

  // Extract movie properties
  const title = movie.title;
  const overview = movie.overview;
  const backdropPath = movie.backdrop_path;
  const homepage = movie.homepage;
  const videos = movie.videos?.results || [];
  const cast = movie.credits?.cast || [];
  const voteAverage = movie.vote_average;
  const voteCount = movie.vote_count;

  return (
    <PageTemplate>
      <DetailContentWrapper>
        <div className="w-full max-w-[1400px] mx-auto space-y-8">
          {/* Enhanced Banner Section - Main Hero */}
          <DetailBanner
            title={title}
            overview={overview}
            backdropPath={backdropPath}
            homepage={homepage}
            videos={videos}
          />

          {/* Watchlist Button */}
          <div className="flex justify-center sm:justify-start">
            <Button variant="outline" size="lg" className="border-2 hover:bg-muted/50">
              <Bookmark className="w-5 h-5 mr-2" />
              Add to Watchlist
            </Button>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Cast Section */}
              <DetailCast cast={cast} title="Cast" maxItems={12} />

              {/* Videos Section */}
              {videos && videos.length > 0 && (
                <>
                  <Separator className="my-8" />
                  <section className="bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl p-8 border border-border/50">
                    <div className="flex items-center gap-3 mb-6">
                      <Play className="w-6 h-6 text-primary" />
                      <h2 className="text-2xl font-bold">Videos & Trailers</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {videos.slice(0, 4).map((video: Video) => (
                        <div
                          key={video.key}
                          className="group relative bg-background rounded-lg overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer transform hover:-translate-y-1"
                          onClick={() => video.key && setSelectedVideo({ key: video.key, name: video.name })}
                        >
                          <div className="aspect-video bg-muted relative overflow-hidden">
                            {video.key ? (
                              <img
                                src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
                                alt={video.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  // Fallback to medium quality if maxresdefault fails
                                  e.currentTarget.src = `https://img.youtube.com/vi/${video.key}/mqdefault.jpg`;
                                }}
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                                <Play className="h-12 w-12 text-muted-foreground" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                                <Play className="h-8 w-8 text-white fill-white" />
                              </div>
                            </div>
                            <div className="absolute top-3 right-3">
                              <Badge variant="secondary" className="text-xs font-medium">
                                {video.type}
                              </Badge>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                              {video.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">{video.site}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              )}
            </div>

            {/* Enhanced Sidebar */}
            <div className="space-y-6">
              {/* Information Section */}
              <DetailInfo
                genres={movie.genres}
                releaseDate={movie.release_date}
                runtime={movie.runtime}
                status={movie.status}
                voteAverage={movie.vote_average}
                voteCount={movie.vote_count}
                type="movie"
              />

              {/* Production Details */}
              <DetailProduction
                productionCompanies={movie.production_companies}
                budget={movie.budget}
                revenue={movie.revenue}
                originalLanguage={movie.original_language}
                productionCountries={movie.production_countries}
                spokenLanguages={movie.spoken_languages}
                type="movie"
              />
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <VideoModal
            isOpen={!!selectedVideo}
            videoKey={selectedVideo.key}
            videoName={selectedVideo.name}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </DetailContentWrapper>
    </PageTemplate>
  );
}
