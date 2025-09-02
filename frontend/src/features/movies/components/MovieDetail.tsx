"use client";

import { useState } from "react";
import { MovieDetails, MovieDetailProps } from "../types";
import { VideoModal } from "@/components/shared";
import { PageTemplate } from "@/components/layout/PageTemplate";
import { DetailContentWrapper } from "@/components/layout/DetailContentWrapper";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { MovieDetailLayout } from "./MovieDetailLayout";
import { MovieCastList } from "./MovieCastList";

// ============================================================================
// MOVIE DETAIL COMPONENT
// ============================================================================

export function MovieDetail({ id, data, loading, error }: MovieDetailProps) {
  const [selectedVideo, setSelectedVideo] = useState<{
    key: string;
    name: string;
  } | null>(null);

  // Use the hook for refetch functionality
  const { refetch, isRefetching } = useMovieDetails(Number(id));

  // Error state
  if (error || !data) {
    return (
      <PageTemplate>
        <DetailContentWrapper error="Failed to load movie details">
          <div className="text-center py-16">
            <div className="text-destructive mb-4 text-lg font-medium">
              Failed to load movie details
            </div>
            <div className="text-muted-foreground">Movie ID: {id}</div>
          </div>
        </DetailContentWrapper>
      </PageTemplate>
    );
  }

  // Extract movie properties
  const movie = data;
  const title = movie.title;
  const overview = movie.overview;
  const backdropPath = movie.backdrop_path;
  const videos = movie.videos?.results || [];
  const cast = movie.credits?.cast || [];

  // Handle video selection
  const handleVideoSelect = (video: {
    key: string;
    name: string;
    type: string;
    site: string;
  }) => {
    setSelectedVideo({ key: video.key, name: video.name });
  };

  // Handle watchlist add
  const handleWatchlistAdd = () => {
    // TODO: Implement watchlist functionality
    console.log("Add to watchlist:", title);
  };

  const handleRefetch = () => {
    refetch();
  };

  // Extract additional metadata for the new layout
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear().toString()
    : undefined;
  const languages = movie.spoken_languages?.map((lang) => lang.name) || [];
  const imdbRating = movie.vote_average;
  const streamoraRating = movie.vote_average; // Using same rating for now
  const genres = movie.genres || [];

  // Extract director and music from credits
  const director = movie.credits?.crew?.find((crew) => crew.job === "Director");
  const music = movie.credits?.crew?.find((crew) => crew.job === "Music");

  return (
    <PageTemplate>
      <DetailContentWrapper>
        <MovieDetailLayout
          title={title}
          overview={overview}
          backdropPath={backdropPath}
          videos={videos}
          onVideoSelect={handleVideoSelect}
          onWatchlistAdd={handleWatchlistAdd}
          releaseYear={releaseYear}
          languages={languages}
          imdbRating={imdbRating}
          streamoraRating={streamoraRating}
          genres={genres}
          director={
            director
              ? {
                  name: director.name,
                  origin: "Unknown", // TMDB crew data doesn't include origin_country
                  profilePath: director.profile_path,
                }
              : undefined
          }
          music={
            music
              ? {
                  name: music.name,
                  origin: "Unknown", // TMDB crew data doesn't include origin_country
                  profilePath: music.profile_path,
                }
              : undefined
          }
        >
          {/* Cast Section */}
          <MovieCastList cast={cast} maxItems={12} />
        </MovieDetailLayout>

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
