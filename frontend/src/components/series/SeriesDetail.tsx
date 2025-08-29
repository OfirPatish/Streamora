"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Play, Star, Calendar, Users, Info, Tv, ExternalLink } from "lucide-react";
import { useSeriesDetails } from "@/hooks/api/useSeries";
import { getTMDBImageUrl } from "@/lib/api";
import { useState } from "react";
import { DetailBanner, DetailInfo, DetailCast, DetailProduction } from "@/components/common/sections";
import { DetailPageSkeleton } from "@/components/common/Skeleton";
import { VideoModal } from "@/components/common/VideoModal";

interface SeriesDetailProps {
  id: string;
}

export function SeriesDetail({ id }: SeriesDetailProps) {
  const { data: series, loading, error } = useSeriesDetails(parseInt(id));
  const [selectedVideo, setSelectedVideo] = useState<{ key: string; name: string } | null>(null);

  if (loading) {
    return <DetailPageSkeleton />;
  }

  if (error || !series) {
    return (
      <div className="text-center py-12">
        <div className="text-destructive mb-4">Failed to load series details</div>
        <div className="text-muted-foreground">Series ID: {id}</div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Banner Section */}
      <DetailBanner
        title={series.name}
        overview={series.overview}
        backdropPath={series.backdrop_path}
        homepage={series.homepage}
        videos={series.videos?.results}
      />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cast Section */}
          <DetailCast cast={series.credits?.cast} title="Cast" maxItems={8} />

          {/* Videos Section */}
          {series.videos?.results && series.videos.results.length > 0 && (
            <>
              <Separator />
              <section className="bg-muted/50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Videos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {series.videos.results.slice(0, 4).map((video) => (
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

          {/* Seasons Section */}
          {series.seasons && series.seasons.length > 0 && (
            <>
              <Separator />
              <section className="bg-muted/50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Seasons</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {series.seasons.slice(0, 6).map((season) => (
                    <div key={season.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="aspect-[2/3] bg-muted rounded mb-3 flex items-center justify-center relative overflow-hidden">
                        {season.poster_path ? (
                          <img
                            src={getTMDBImageUrl(season.poster_path, "poster", "medium") || undefined}
                            alt={season.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Tv className="h-8 w-8 text-muted-foreground" />
                        )}
                      </div>
                      <h3 className="font-medium text-sm">{season.name}</h3>
                      <p className="text-xs text-muted-foreground">{season.episode_count} episodes</p>
                      {season.air_date && (
                        <p className="text-xs text-muted-foreground">{new Date(season.air_date).getFullYear()}</p>
                      )}
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
            type="series"
            genres={series.genres}
            firstAirDate={series.first_air_date}
            lastAirDate={series.last_air_date}
            status={series.status}
            voteAverage={series.vote_average}
            voteCount={series.vote_count}
            numberOfSeasons={series.number_of_seasons}
            numberOfEpisodes={series.number_of_episodes}
            networks={series.networks}
          />

          {/* Production Details */}
          <DetailProduction
            type="series"
            productionCompanies={series.production_companies}
            originalLanguage={series.original_language}
            productionCountries={series.production_countries}
            spokenLanguages={series.spoken_languages}
          />

          {/* Key Crew */}
          {series.credits?.crew && series.credits.crew.length > 0 && (
            <section className="bg-muted/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Key Crew</h2>
              <div className="space-y-3">
                {series.credits.crew
                  .filter((member) => ["Creator", "Producer", "Writer", "Director"].includes(member.job))
                  .slice(0, 5)
                  .map((member, index) => (
                    <div key={`${member.id}-${member.job}-${index}`}>
                      <p className="font-medium text-sm">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.job}</p>
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* Tagline */}
          {series.tagline && (
            <section className="bg-muted/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Tagline</h2>
              <p className="text-sm italic text-muted-foreground">"{series.tagline}"</p>
            </section>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoKey={selectedVideo.key}
          videoName={selectedVideo.name}
        />
      )}
    </div>
  );
}
