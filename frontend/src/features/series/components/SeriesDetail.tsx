"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Play, Bookmark } from "lucide-react";
import { SeriesDetails } from "../types";
import { DetailBanner, DetailInfo, DetailCast, DetailProduction, DetailPageLayout } from "@/components/shared";

import { VideoModal } from "@/components/shared";
import { PageTemplate } from "@/components/layout/PageTemplate";
import { DetailContentWrapper } from "@/components/layout/DetailContentWrapper";
import { useSeriesDetails } from "../hooks/useSeriesDetails";

// ============================================================================
// INTERFACES
// ============================================================================

import { SeriesDetailProps, Video } from "../types";

// ============================================================================
// SERIES DETAIL COMPONENT
// ============================================================================

export function SeriesDetail({ id, data, loading, error }: SeriesDetailProps) {
  const [selectedVideo, setSelectedVideo] = useState<{ key: string; name: string } | null>(null);

  // Use the hook for refetch functionality
  const { refetch, isRefetching } = useSeriesDetails(Number(id));

  const handleRefetch = () => {
    refetch();
  };

  // Use passed data instead of hook
  const series = data;

  // Error state
  if (error || !series) {
    return (
      <PageTemplate>
        <DetailContentWrapper error="Failed to load TV show details">
          <div className="text-center py-16">
            <div className="text-destructive mb-4 text-lg font-medium">Failed to load TV show details</div>
            <div className="text-muted-foreground">Series ID: {id}</div>
          </div>
        </DetailContentWrapper>
      </PageTemplate>
    );
  }

  // Extract series properties
  const title = series.name;
  const overview = series.overview;
  const backdropPath = series.backdrop_path;
  const homepage = series.homepage;
  const videos = series.videos?.results || [];
  const cast = series.credits?.cast || [];
  const voteAverage = series.vote_average;
  const voteCount = series.vote_count;

  // Handle video selection
  const handleVideoSelect = (video: { key: string; name: string }) => {
    setSelectedVideo(video);
  };

  // Handle watchlist add
  const handleWatchlistAdd = () => {
    // TODO: Implement watchlist functionality
    console.log("Add to watchlist:", title);
  };

  return (
    <PageTemplate>
      <DetailContentWrapper>
        <div className="w-full max-w-[1400px] mx-auto">
          <DetailPageLayout
            type="series"
            title={title}
            overview={overview}
            backdropPath={backdropPath}
            homepage={homepage}
            videos={videos}
            onVideoSelect={handleVideoSelect}
            onWatchlistAdd={handleWatchlistAdd}
            onRefetch={handleRefetch}
            isRefetching={isRefetching}
            essentialInfo={
              <DetailInfo
                genres={series.genres}
                releaseDate={series.first_air_date}
                runtime={undefined}
                status={series.status}
                voteAverage={series.vote_average}
                type="series"
                numberOfSeasons={series.number_of_seasons}
                numberOfEpisodes={series.number_of_episodes}
                firstAirDate={series.first_air_date}
              />
            }
            productionInfo={
              <DetailProduction
                productionCompanies={series.production_companies}
                originalLanguage={series.original_language}
                productionCountries={series.production_countries}
                type="series"
              />
            }
          >
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
          </DetailPageLayout>
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
