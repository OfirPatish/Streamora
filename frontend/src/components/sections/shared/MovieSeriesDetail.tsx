"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Play, Star, Clock, Calendar, Users, Info, ExternalLink } from "lucide-react";
import { useMovieDetails, useSeriesDetails } from "@/hooks/api/useDetailQueries";
import { getTMDBImageUrl } from "@/lib/api";
import { DetailBanner, DetailInfo, DetailCast, DetailProduction } from "@/components/sections/shared/DetailComponents";
import { DetailPageSkeleton } from "@/components/ui/skeletons/Skeleton";
import { VideoModal } from "@/components/sections/shared";
import { PageTemplate } from "@/components/layout/PageTemplate";
import { ContentSection } from "@/components/layout/PageContentWrapper";

// ============================================================================
// INTERFACES
// ============================================================================

interface DetailPageProps {
  id: string;
  type: "movie" | "series";
}

interface Video {
  key: string;
  name: string;
  site: string;
  type: string;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function DetailPage({ id, type }: DetailPageProps) {
  const [selectedVideo, setSelectedVideo] = useState<{ key: string; name: string } | null>(null);

  // Use appropriate hook based on type
  const movieQuery = useMovieDetails(parseInt(id));
  const seriesQuery = useSeriesDetails(parseInt(id));

  const { data: movie, isLoading: movieLoading, error: movieError } = movieQuery;
  const { data: series, isLoading: seriesLoading, error: seriesError } = seriesQuery;

  // Get the appropriate data and loading state
  const data = type === "movie" ? movie : series;
  const isLoading = type === "movie" ? movieLoading : seriesLoading;
  const error = type === "movie" ? movieError : seriesError;

  // Loading state
  if (isLoading) {
    return (
      <PageTemplate>
        <ContentSection>
          <DetailPageSkeleton />
        </ContentSection>
      </PageTemplate>
    );
  }

  // Error state
  if (error || !data) {
    return (
      <PageTemplate>
        <ContentSection error={`Failed to load ${type === "movie" ? "movie" : "TV show"} details`}>
          <div className="text-center py-12">
            <div className="text-destructive mb-4">Failed to load {type === "movie" ? "movie" : "TV show"} details</div>
            <div className="text-muted-foreground">
              {type === "movie" ? "Movie" : "Series"} ID: {id}
            </div>
          </div>
        </ContentSection>
      </PageTemplate>
    );
  }

  // Extract common properties
  const title = type === "movie" ? (data as any).title : (data as any).name;
  const overview = data.overview;
  const backdropPath = data.backdrop_path;
  const homepage = (data as any).homepage;
  const videos = (data as any).videos?.results || [];
  const cast = (data as any).credits?.cast || [];

  return (
    <PageTemplate>
      <ContentSection
        title={title}
        subtitle={overview}
        showHero={true}
        heroContent={
          <div className="text-center sm:text-left">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent mb-6 tracking-tight">
              {title}
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl font-medium">{overview}</p>
          </div>
        }
      >
        <div className="w-full space-y-6">
          {/* Banner Section */}
          <DetailBanner
            title={title}
            overview={overview}
            backdropPath={backdropPath}
            homepage={homepage}
            videos={videos}
          />

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cast Section */}
              <DetailCast cast={cast} title="Cast" maxItems={8} />

              {/* Videos Section */}
              {videos && videos.length > 0 && (
                <>
                  <Separator />
                  <section className="bg-muted/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Videos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {videos.slice(0, 4).map((video: Video) => (
                        <div
                          key={video.key}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => video.key && setSelectedVideo({ key: video.key, name: video.name })}
                        >
                          <div className="aspect-video bg-muted rounded mb-2 flex items-center justify-center relative overflow-hidden">
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
                              <Play className="h-8 w-8 text-muted-foreground" />
                            )}
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <Play className="h-8 w-8 text-white" />
                            </div>
                          </div>
                          <h3 className="font-medium">{video.name}</h3>
                          <p className="text-sm text-muted-foreground">{video.type}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Information Section */}
              <DetailInfo
                genres={data.genres}
                releaseDate={type === "movie" ? (data as any).release_date : undefined}
                runtime={type === "movie" ? (data as any).runtime : undefined}
                status={data.status}
                voteAverage={data.vote_average}
                voteCount={data.vote_count}
                type={type}
                // Series-specific props
                numberOfSeasons={type === "series" ? (data as any).number_of_seasons : undefined}
                numberOfEpisodes={type === "series" ? (data as any).number_of_episodes : undefined}
                firstAirDate={type === "series" ? (data as any).first_air_date : undefined}
                lastAirDate={type === "series" ? (data as any).last_air_date : undefined}
                networks={type === "series" ? (data as any).networks : undefined}
              />

              {/* Production Details */}
              <DetailProduction
                productionCompanies={(data as any).production_companies}
                budget={type === "movie" ? (data as any).budget : undefined}
                revenue={type === "movie" ? (data as any).revenue : undefined}
                originalLanguage={data.original_language}
                productionCountries={(data as any).production_countries}
                spokenLanguages={(data as any).spoken_languages}
                type={type}
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
      </ContentSection>
    </PageTemplate>
  );
}

// ============================================================================
// CONVENIENCE COMPONENTS
// ============================================================================

// Convenience component for movies
export function MovieDetail({ id }: { id: string }) {
  return <DetailPage id={id} type="movie" />;
}

// Convenience component for series
export function SeriesDetail({ id }: { id: string }) {
  return <DetailPage id={id} type="series" />;
}
