import { Card, CardContent } from "@/components/ui/card";
import { Skeleton as UISkeleton } from "@/components/ui/skeleton";

// MovieCard Skeleton - for carousel and grid items
export function MovieCardSkeleton() {
  return (
    <div className="w-full group">
      <Card className="cursor-pointer transition-all duration-300 w-full relative overflow-hidden bg-transparent border-transparent p-0">
        <CardContent className="p-0 w-full relative">
          {/* Poster Skeleton */}
          <div className="poster-aspect flex items-center justify-center w-full bg-muted/50 transition-all duration-300 relative overflow-hidden rounded-lg border border-border/20">
            <UISkeleton className="w-full h-full rounded-lg bg-muted animate-pulse" />
          </div>

          {/* Title Skeleton */}
          <div className="mt-2 px-1">
            <UISkeleton className="h-4 w-3/4 mx-auto mb-1 bg-muted animate-pulse" />
            <UISkeleton className="h-3 w-1/2 mx-auto bg-muted animate-pulse" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Detail Page Skeleton - for movie/series detail pages
export function DetailPageSkeleton() {
  return (
    <div className="w-full space-y-6">
      {/* Banner Section Skeleton */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg">
        <UISkeleton className="w-full h-full" />

        {/* Content Overlay Skeleton */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-4xl space-y-4">
            <UISkeleton className="h-12 w-3/4" />
            <UISkeleton className="h-4 w-full" />
            <UISkeleton className="h-4 w-2/3" />
            <div className="flex gap-3">
              <UISkeleton className="h-10 w-32" />
              <UISkeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cast Section Skeleton */}
          <div className="bg-muted/50 rounded-lg p-6">
            <UISkeleton className="h-6 w-24 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="text-center">
                  <UISkeleton className="w-16 h-16 rounded-full mx-auto mb-2" />
                  <UISkeleton className="h-3 w-20 mx-auto mb-1" />
                  <UISkeleton className="h-2 w-16 mx-auto" />
                </div>
              ))}
            </div>
          </div>

          {/* Videos Section Skeleton */}
          <div className="bg-muted/50 rounded-lg p-6">
            <UISkeleton className="h-6 w-20 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <UISkeleton className="aspect-video w-full rounded mb-2" />
                  <UISkeleton className="h-4 w-3/4 mb-1" />
                  <UISkeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Information Section Skeleton */}
          <div className="bg-muted/50 rounded-lg p-6">
            <UISkeleton className="h-6 w-32 mb-4" />
            <div className="space-y-3">
              <UISkeleton className="h-4 w-full" />
              <UISkeleton className="h-4 w-3/4" />
              <UISkeleton className="h-4 w-2/3" />
              <UISkeleton className="h-4 w-4/5" />
            </div>
          </div>

          {/* Production Details Skeleton */}
          <div className="bg-muted/50 rounded-lg p-6">
            <UISkeleton className="h-6 w-40 mb-4" />
            <div className="space-y-3">
              <UISkeleton className="h-4 w-full" />
              <UISkeleton className="h-4 w-3/4" />
              <UISkeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Search Result Skeleton - for search results
export function SearchResultSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Poster Skeleton */}
          <UISkeleton className="w-16 h-24 rounded-lg flex-shrink-0" />

          {/* Content Skeleton */}
          <div className="flex-1 space-y-2">
            <div className="flex items-start gap-2">
              <UISkeleton className="h-5 w-3/4" />
              <UISkeleton className="h-5 w-16" />
            </div>
            <div className="flex items-center gap-4">
              <UISkeleton className="h-4 w-16" />
              <UISkeleton className="h-4 w-12" />
            </div>
            <UISkeleton className="h-4 w-full" />
            <UISkeleton className="h-4 w-2/3" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Hero Section Skeleton - for hero carousel (legacy)
export function HeroSkeleton() {
  return (
    <section className="w-full px-4 sm:px-6 py-4 sm:py-8">
      <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] rounded-lg sm:rounded-xl overflow-hidden bg-muted">
        <UISkeleton className="w-full h-full" />

        {/* Content Overlay Skeleton */}
        <div className="absolute inset-0 flex items-center z-20">
          <div className="max-w-2xl pl-12 pr-8 space-y-6">
            <UISkeleton className="h-16 w-3/4" />
            <div className="space-y-4">
              <UISkeleton className="h-4 w-20" />
              <UISkeleton className="h-4 w-32" />
              <UISkeleton className="h-4 w-24" />
            </div>
            <UISkeleton className="h-6 w-full" />
            <UISkeleton className="h-6 w-2/3" />
            <div className="flex gap-3">
              <UISkeleton className="h-12 w-32" />
              <UISkeleton className="h-12 w-32" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Split Screen Hero Skeleton - for desktop split-screen hero
export function SplitScreenHeroSkeleton() {
  return (
    <section className="hidden sm:block w-full -mt-16">
      <div className="relative w-full h-screen overflow-hidden bg-muted">
        {/* Left Panel Skeleton */}
        <div className="absolute inset-0 h-full overflow-hidden" style={{ width: "50%", left: "0%" }}>
          <UISkeleton className="w-full h-full animate-pulse" />

          {/* Content Overlay Skeleton */}
          <div className="absolute inset-0 flex items-end">
            <div className="w-full px-8 pb-16">
              <div className="space-y-4">
                {/* Badge Skeleton */}
                <div className="flex items-center gap-3">
                  <UISkeleton className="h-6 w-20" />
                  <UISkeleton className="h-4 w-32" />
                </div>

                {/* Title Skeleton */}
                <UISkeleton className="h-12 w-3/4" />

                {/* Description Skeleton */}
                <div className="space-y-2">
                  <UISkeleton className="h-4 w-full" />
                  <UISkeleton className="h-4 w-2/3" />
                </div>

                {/* Buttons Skeleton */}
                <div className="flex gap-4">
                  <UISkeleton className="h-12 w-32" />
                  <UISkeleton className="h-12 w-32" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel Skeleton */}
        <div className="absolute inset-0 h-full overflow-hidden" style={{ width: "50%", right: "0%" }}>
          <UISkeleton className="w-full h-full animate-pulse" />

          {/* Content Overlay Skeleton (full content for 50-50 split) */}
          <div className="absolute inset-0 flex items-end">
            <div className="w-full px-8 pb-16">
              <div className="space-y-4">
                {/* Badge Skeleton */}
                <div className="flex items-center gap-3">
                  <UISkeleton className="h-6 w-20" />
                  <UISkeleton className="h-4 w-32" />
                </div>

                {/* Title Skeleton */}
                <UISkeleton className="h-12 w-3/4" />

                {/* Description Skeleton */}
                <div className="space-y-2">
                  <UISkeleton className="h-4 w-full" />
                  <UISkeleton className="h-4 w-2/3" />
                </div>

                {/* Buttons Skeleton */}
                <div className="flex gap-4">
                  <UISkeleton className="h-12 w-32" />
                  <UISkeleton className="h-12 w-32" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Mobile Hero Card Skeleton - for mobile hero card
export function MobileHeroCardSkeleton() {
  return (
    <section className="sm:hidden w-full py-4">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative w-full h-48 rounded-lg overflow-hidden bg-muted">
          <UISkeleton className="w-full h-full animate-pulse" />

          {/* Content Overlay Skeleton */}
          <div className="absolute inset-0 flex flex-col justify-end p-4">
            {/* Badge Skeleton */}
            <div className="flex items-center gap-2 mb-2">
              <UISkeleton className="h-4 w-8" />
              <UISkeleton className="h-3 w-16" />
            </div>

            {/* Title Skeleton */}
            <UISkeleton className="h-6 w-3/4 mb-2" />

            {/* Buttons Skeleton */}
            <div className="flex gap-3">
              <UISkeleton className="h-8 w-20" />
              <UISkeleton className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Default export for backward compatibility (MovieCard Skeleton)
export function Skeleton() {
  return <MovieCardSkeleton />;
}
