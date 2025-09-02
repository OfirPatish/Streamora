"use client";

import { SeriesDetailProps } from "../types";
import { PageTemplate } from "@/components/layout/PageTemplate";
import { DetailContentWrapper } from "@/components/layout/DetailContentWrapper";

// ============================================================================
// SERIES DETAIL COMPONENT - TEMPORARY PLACEHOLDER
// ============================================================================
// TODO: Replace this with proper series layout copied from movies layout
// The old shared components were removed to separate movies and series

export function SeriesDetail({ id, data, loading, error }: SeriesDetailProps) {
  // Error state
  if (error || !data) {
    return (
      <PageTemplate>
        <DetailContentWrapper error="Failed to load TV show details">
          <div className="text-center py-16">
            <div className="text-destructive mb-4 text-lg font-medium">
              Failed to load TV show details
            </div>
            <div className="text-muted-foreground">Series ID: {id}</div>
          </div>
        </DetailContentWrapper>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <DetailContentWrapper>
        <div className="text-center py-16">
          <div className="text-foreground mb-4 text-lg font-medium">
            Series Detail Layout Coming Soon
          </div>
          <div className="text-muted-foreground">
            This will be replaced with the proper series layout copied from
            movies
          </div>
          <div className="mt-4 p-4 bg-muted/20 rounded-lg border border-border/50">
            <h1 className="text-2xl font-bold mb-2">{data.name}</h1>
            <p className="text-muted-foreground">{data.overview}</p>
          </div>
        </div>
      </DetailContentWrapper>
    </PageTemplate>
  );
}
