"use client";

import { ReactNode } from "react";

import { Loader2 } from "lucide-react";

interface DetailContentWrapperProps {
  children: ReactNode;
  loading?: boolean;
  error?: string | null;
  className?: string;
}

export function DetailContentWrapper({
  children,
  loading = false,
  error = null,
  className = "",
}: DetailContentWrapperProps) {
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
      {/* Main Content - No hero, no page header, just content */}
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        <div>{children}</div>
      </div>
    </div>
  );
}
