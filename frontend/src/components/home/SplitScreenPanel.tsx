"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Play, Plus } from "lucide-react";
import { FeaturedContent } from "@/types/content";

interface SplitScreenPanelProps {
  content: FeaturedContent | null;
  backdropUrl: string | null;
  side: "left" | "right";
  hoveredSide: "left" | "right" | null;
  width: any;
  x: any;
  scale: any;
  onHoverStart: (side: "left" | "right") => void;
  onHoverEnd: () => void;
}

export function SplitScreenPanel({
  content,
  backdropUrl,
  side,
  hoveredSide,
  width,
  x,
  scale,
  onHoverStart,
  onHoverEnd,
}: SplitScreenPanelProps) {
  const isHovered = hoveredSide === side;
  // Only show full content when this specific panel is hovered
  const showFullContent = isHovered;
  const category = side === "left" ? "Movies" : "TV Shows";

  return (
    <motion.div
      className="absolute inset-0 h-full overflow-hidden"
      style={{
        width,
        left: side === "right" ? "auto" : "0%",
        right: side === "right" ? "0%" : "auto",
      }}
      initial={{
        opacity: 0,
        scale: 0.95,
        y: 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: side === "left" ? 0.2 : 0.4, // Stagger the animations
      }}
      onHoverStart={() => onHoverStart(side)}
      onHoverEnd={onHoverEnd}
      layout
    >
      <div className="relative w-full h-full overflow-hidden">
        {backdropUrl && (
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backdropUrl})` }}
            initial={{
              scale: 1.1,
              opacity: 0,
            }}
            animate={{
              scale: isHovered ? 1.02 : 1,
              opacity: 1,
            }}
            transition={{
              scale: { duration: 0.6, ease: "easeOut" },
              opacity: { duration: 0.8, delay: side === "left" ? 0.3 : 0.5 },
            }}
          />
        )}

        {/* Gradient Overlay with Enhanced Shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Bottom Shadow/Fade Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-8 pb-16">
            <motion.div
              style={{ scale }}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Netflix-style Badge - Always visible */}
              <motion.div
                className="flex items-center gap-3 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: side === "left" ? 0.6 : 0.8,
                }}
              >
                <div className="bg-red-600 text-white text-sm font-bold px-2 py-1 rounded">#1 TODAY</div>
                <span className="text-white/80 text-sm">#1 in {category} Today</span>
              </motion.div>

              {/* Title - Always visible */}
              <motion.h1
                className="text-white font-bold mb-4"
                initial={{
                  fontSize: "1.5rem",
                  lineHeight: "2rem",
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  fontSize: showFullContent ? "2.5rem" : "1.5rem",
                  lineHeight: showFullContent ? "3rem" : "2rem",
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  fontSize: { type: "spring", stiffness: 300, damping: 30 },
                  lineHeight: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.6, delay: side === "left" ? 0.7 : 0.9 },
                  y: { duration: 0.6, delay: side === "left" ? 0.7 : 0.9 },
                }}
              >
                {content?.title || `Featured ${side === "left" ? "Movie" : "Series"}`}
              </motion.h1>

              {/* Description - Only show when hovered */}
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                  marginBottom: 0,
                }}
                animate={{
                  opacity: showFullContent ? 1 : 0,
                  height: showFullContent ? "auto" : 0,
                  marginBottom: showFullContent ? "1.5rem" : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-white/90 text-base line-clamp-3 max-w-md">
                  {content?.description || `Discover this amazing ${side === "left" ? "movie" : "series"}.`}
                </p>
              </motion.div>

              {/* Action Buttons - Only show when hovered */}
              <motion.div
                className="flex gap-4"
                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}
                animate={{
                  opacity: showFullContent ? 1 : 0,
                  scale: showFullContent ? 1 : 0.95,
                }}
                transition={{ duration: 0.3 }}
              >
                <Button size="lg" className="bg-white text-black hover:bg-white/90 px-6 py-2 text-base font-semibold">
                  <Play className="h-5 w-5 mr-2" />
                  Watch Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/50 text-white hover:bg-white/10 px-6 py-2 text-base font-semibold"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add to List
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
