"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink } from "lucide-react";
import { getTMDBImageUrl } from "@/lib/api";

// ============================================================================
// INTERFACES
// ============================================================================

interface DetailBannerProps {
  title: string;
  overview?: string;
  backdropPath?: string | null;
  homepage?: string | null;
  videos?: Array<{
    key: string;
    name: string;
    site: string;
    type: string;
  }>;
}

// ============================================================================
// DETAIL BANNER COMPONENT
// ============================================================================

export function DetailBanner({ title, overview, backdropPath, homepage, videos }: DetailBannerProps) {
  const [showTrailer, setShowTrailer] = useState(false);

  // Find the first YouTube trailer
  const trailer = videos?.find((video) => video.site === "YouTube" && video.type === "Trailer");
  const bannerUrl = backdropPath ? getTMDBImageUrl(backdropPath, "backdrop", "large") : null;

  return (
    <>
      {/* Enhanced Banner Section */}
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-2xl border border-border/50 shadow-2xl">
        {bannerUrl ? (
          <img src={bannerUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted via-muted/80 to-muted/50" />
        )}

        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent" />

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-5xl">
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 drop-shadow-2xl leading-tight">
              {title}
            </h1>

            {overview && (
              <p className="text-foreground/90 text-lg md:text-xl mb-8 line-clamp-3 max-w-3xl font-medium drop-shadow-lg leading-relaxed">
                {overview}
              </p>
            )}

            <div className="flex flex-wrap gap-4">
              {trailer && (
                <Button
                  onClick={() => setShowTrailer(true)}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-primary/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  Watch Trailer
                </Button>
              )}

              {homepage && (
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="bg-background/20 hover:bg-background/30 text-foreground border-2 border-border/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <a href={homepage} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Official Site
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Trailer Modal */}
      {showTrailer && trailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-5xl aspect-video">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTrailer(false)}
              className="absolute -top-12 right-0 text-white hover:text-white/80 hover:bg-white/10 rounded-full p-2"
            >
              <span className="text-2xl">×</span>
            </Button>
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title={trailer.name}
              className="w-full h-full rounded-xl shadow-2xl"
              allowFullScreen
              allow="autoplay; encrypted-media"
            />
          </div>
        </div>
      )}
    </>
  );
}
