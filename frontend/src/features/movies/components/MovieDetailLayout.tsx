"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Play,
  Plus,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { getTMDBImageUrl } from "@/lib/api";
import { MovieDetails } from "@/features/browse/types/content";

// ============================================================================
// MAIN COMPONENT
// ============================================================================

interface MovieDetailLayoutProps {
  movie: MovieDetails;
}

export function MovieDetailLayout({ movie }: MovieDetailLayoutProps) {
  const hasVideos =
    movie.videos && movie.videos.results && movie.videos.results.length > 0;
  const bannerUrl = movie.backdrop_path
    ? getTMDBImageUrl(movie.backdrop_path, "backdrop", "original")
    : undefined;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Backdrop Image */}
        {bannerUrl && (
          <div className="absolute inset-0">
            <img
              src={bannerUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
        )}

        {/* Content Overlay */}
        <div className="relative z-10 px-6 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              {/* Title */}
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                {movie.title}
              </h1>

              {/* Tagline/Overview */}
              {movie.overview && (
                <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-3xl leading-relaxed drop-shadow-lg">
                  {movie.overview}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                {hasVideos && (
                  <Button
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-200 rounded-lg"
                  >
                    <Play className="w-6 h-6 mr-3 fill-current" />
                    Play Now
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/30 hover:border-white/50 hover:bg-white/10 text-white px-6 py-4 text-lg font-medium transition-all duration-200 rounded-lg"
                >
                  <Plus className="w-6 h-6" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/30 hover:border-white/50 hover:bg-white/10 text-white px-6 py-4 text-lg font-medium transition-all duration-200 rounded-lg"
                  disabled
                >
                  <Volume2 className="w-6 h-6" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/30 hover:border-white/50 hover:bg-white/10 text-white px-6 py-4 text-lg font-medium transition-all duration-200 rounded-lg"
                  disabled
                >
                  <VolumeX className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Two Column Layout */}
      <div className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description Section */}
              <section className="bg-muted/20 rounded-xl border border-border/50 p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Description
                </h2>
                {movie.overview && (
                  <p className="text-foreground/80 leading-relaxed">
                    {movie.overview}
                  </p>
                )}
              </section>

              {/* Cast Section */}
              <section className="bg-muted/20 rounded-xl border border-border/50 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    Cast
                  </h2>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="p-2">
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2">
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {/* Cast members will be rendered here by the parent component */}
                  <p className="text-muted-foreground">
                    Cast information will be displayed in the tabs below.
                  </p>
                </div>
              </section>

              {/* Reviews Section */}
              <section className="bg-muted/20 rounded-xl border border-border/50 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    Reviews
                  </h2>
                  <Button variant="outline" size="sm">
                    + Add Your Review
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Sample Review Cards - These would be populated with real data */}
                  <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          AR
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Aniket Roy</p>
                        <p className="text-xs text-muted-foreground">
                          From India
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < 4
                              ? "text-red-500 fill-current"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-foreground/80 line-clamp-3">
                      This movie was recommended to me by a very dear friend who
                      went for the movie by herself. I went to the cinemas to
                      watch but had a houseful board so couldn't watch it.
                    </p>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          S
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Swaraj</p>
                        <p className="text-xs text-muted-foreground">
                          From India
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-red-500 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-foreground/80 line-clamp-3">
                      A restless king promises his lands to the local tribals in
                      exchange of a stone (Panjurli, a deity of Keradi Village)
                      wherein he finds solace and peace of mind.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center mt-6">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="p-2">
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <Button variant="ghost" size="sm" className="p-2">
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column - Metadata Sidebar */}
            <div className="space-y-6">
              {/* Released Year */}
              {movie.release_date && (
                <section className="bg-muted/20 rounded-xl border border-border/50 p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Released Year
                  </h3>
                  <p className="text-foreground/80">
                    {new Date(movie.release_date).getFullYear()}
                  </p>
                </section>
              )}

              {/* Available Languages */}
              {movie.spoken_languages && movie.spoken_languages.length > 0 && (
                <section className="bg-muted/20 rounded-xl border border-border/50 p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Available Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.spoken_languages.map((language) => (
                      <Button
                        key={language.iso_639_1}
                        variant="outline"
                        size="sm"
                      >
                        {language.english_name}
                      </Button>
                    ))}
                  </div>
                </section>
              )}

              {/* Ratings */}
              <section className="bg-muted/20 rounded-xl border border-border/50 p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Ratings
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/80">Rating</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">
                        {movie.vote_average.toFixed(1)}
                      </span>
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/80">Votes</span>
                    <span className="text-sm font-medium">
                      {movie.vote_count.toLocaleString()}
                    </span>
                  </div>
                </div>
              </section>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <section className="bg-muted/20 rounded-xl border border-border/50 p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Genres
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <Badge
                        key={genre.id}
                        variant="secondary"
                        className="px-3 py-1"
                      >
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                </section>
              )}

              {/* Runtime */}
              {movie.runtime && (
                <section className="bg-muted/20 rounded-xl border border-border/50 p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Runtime
                  </h3>
                  <p className="text-foreground/80">{movie.runtime} minutes</p>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
