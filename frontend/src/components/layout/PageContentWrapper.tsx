"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

interface ContentSectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  loading?: boolean;
  error?: string | null;
  className?: string;
  showHero?: boolean;
  heroContent?: ReactNode;
}

export function ContentSection({
  children,
  title,
  subtitle,
  loading = false,
  error = null,
  className = "",
  showHero = false,
  heroContent,
}: ContentSectionProps) {
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading content...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="text-destructive mb-4">Error loading content</div>
            <div className="text-muted-foreground">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full min-h-screen bg-gradient-to-b from-background via-background to-muted/20 ${className}`}>
      {/* Hero Section (optional) */}
      {showHero && heroContent && (
        <div className="relative w-full h-[40vh] min-h-[300px] sm:min-h-[400px] overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-background">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-background/80" />

          <div className="relative h-full flex items-center justify-center sm:justify-start">
            <div className="max-w-7xl mx-auto px-8 w-full">{heroContent}</div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
        </div>
      )}

      {/* Page Header */}
      {title && (
        <div className="bg-background/80 backdrop-blur-sm border-b border-border/50 py-4">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent mb-2 tracking-tight">
                {title}
              </h1>
              {subtitle && <p className="text-lg sm:text-xl text-muted-foreground font-medium">{subtitle}</p>}
            </motion.div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
