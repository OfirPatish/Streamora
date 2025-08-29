"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Play, Star, Clock, Calendar, Users, Info, ExternalLink } from "lucide-react";
import { useMovieDetails } from "@/hooks/api/useMovies";
import { getTMDBImageUrl } from "@/lib/api";
import { useState } from "react";
import { DetailBanner, DetailInfo, DetailCast, DetailProduction } from "@/components/common/sections";
import { DetailPageSkeleton } from "@/components/common/Skeleton";
import { VideoModal } from "@/components/common/VideoModal";

interface MovieDetailProps {
  id: string;
}

export function MovieDetail({ id }: MovieDetailProps) {
  const { data: movie, loading, error } = useMovieDetails(parseInt(id));
  const [selectedVideo, setSelectedVideo] = useState<{ key: string; name: string } | null>(null);

  if (loading) {
    return (
      <div className="py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <DetailPageSkeleton />
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="text-destructive mb-4">Failed to load movie details</div>
            <div className="text-muted-foreground">Movie ID: {id}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="w-full space-y-6">
          {/* Banner Section */}
          <DetailBanner
            title={movie.title}
            overview={movie.overview}
            backdropPath={movie.backdrop_path}
            homepage={movie.homepage}
            videos={movie.videos?.results}
          />

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cast Section */}
              <DetailCast cast={movie.credits?.cast} title="Cast" maxItems={8} />

              {/* Videos Section */}
              {movie.videos?.results && movie.videos.results.length > 0 && (
                <>
                  <Separator />
                  <section className="bg-muted/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Videos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {movie.videos.results.slice(0, 4).map((video) => (
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
                type="movie"
                genres={movie.genres}
                releaseDate={movie.release_date}
                runtime={movie.runtime}
                status={movie.status}
                voteAverage={movie.vote_average}
                voteCount={movie.vote_count}
              />

              {/* Production Details */}
              <DetailProduction
                type="movie"
                productionCompanies={movie.production_companies}
                budget={movie.budget}
                revenue={movie.revenue}
                originalLanguage={movie.original_language}
                productionCountries={movie.production_countries}
                spokenLanguages={movie.spoken_languages}
              />

              {/* Key Crew */}
              {movie.credits?.crew && movie.credits.crew.length > 0 && (
                <section className="bg-muted/50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Key Crew</h2>
                  <div className="space-y-3">
                    {movie.credits.crew
                      .filter((member) => ["Director", "Producer", "Writer"].includes(member.job))
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
              {movie.tagline && (
                <section className="bg-muted/50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Tagline</h2>
                  <p className="text-sm italic text-muted-foreground">"{movie.tagline}"</p>
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
      </div>
    </div>
  );
}
