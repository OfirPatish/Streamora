"use client";

import { Button } from "@/components/ui/button";
import { Play, Plus } from "lucide-react";
import { FeaturedContent } from "@/types/content";

interface MobileHeroCardProps {
  content: FeaturedContent | null;
  backdropUrl: string | null;
}

export function MobileHeroCard({ content, backdropUrl }: MobileHeroCardProps) {
  return (
    <section className="sm:hidden w-full py-4">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative w-full h-48 rounded-lg overflow-hidden bg-muted shadow-xl">
          {/* Background Image */}
          {backdropUrl && (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${backdropUrl})` }}
            />
          )}

          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* Bottom Shadow/Fade Effect for Mobile */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-4">
            {/* Netflix-style Badge */}
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">#1</div>
              <span className="text-white/80 text-xs">#1 Movie Today</span>
            </div>

            <h2 className="text-white font-semibold text-lg mb-2">{content?.title || "Featured Movie"}</h2>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button size="sm" className="bg-white text-black hover:bg-white/90">
                <Play className="h-4 w-4 mr-1" />
                Watch
              </Button>
              <Button size="sm" variant="outline" className="border-white text-white hover:bg-white/10">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
