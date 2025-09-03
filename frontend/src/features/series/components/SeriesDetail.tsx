"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { DetailPageLayout } from "@/components/layout/DetailPageLayout";
import { SeriesDetails } from "@/features/browse/types/content";

interface SeriesDetailProps {
  id: string;
  data: SeriesDetails;
  loading: boolean;
  error: string | null;
}

export function SeriesDetail({ id, data, loading, error }: SeriesDetailProps) {
  if (loading) {
    return (
      <AppLayout>
        <DetailPageLayout loading={true}>
          <div className="text-center py-16">
            <p className="text-muted-foreground">Loading TV show details...</p>
          </div>
        </DetailPageLayout>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <DetailPageLayout error="Failed to load TV show details">
          <div className="text-center py-16">
            <p className="text-destructive">Error: {error}</p>
          </div>
        </DetailPageLayout>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <DetailPageLayout>
        <div className="space-y-8">
          {/* Series Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{data.name}</h1>
            {data.overview && (
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                {data.overview}
              </p>
            )}
          </div>

          {/* Series Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-semibold text-primary">
                {data.vote_average}
              </div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-primary">
                {data.vote_count}
              </div>
              <div className="text-sm text-muted-foreground">Votes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-primary">
                {data.popularity}
              </div>
              <div className="text-sm text-muted-foreground">Popularity</div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center text-muted-foreground">
            <p>Series ID: {id}</p>
            <p>Release Date: {data.first_air_date}</p>
            <p>Language: {data.original_language}</p>
          </div>
        </div>
      </DetailPageLayout>
    </AppLayout>
  );
}
