import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MovieCardSkeleton() {
  return (
    <div className="w-full">
      <Card className="w-full">
        <CardContent className="p-0 w-full">
          {/* Poster Skeleton */}
          <Skeleton className="poster-aspect w-full rounded-t-lg" />

          {/* Content Skeleton */}
          <div className="p-3 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
