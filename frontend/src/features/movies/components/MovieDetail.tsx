"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DetailPageLayout } from "@/components/layout/DetailPageLayout";
import { MovieDetailLayout } from "./MovieDetailLayout";
import { MovieCastList } from "./MovieCastList";
import type { MovieDetails } from "@/features/browse/types/content";

interface MovieDetailProps {
  id: string;
  data: MovieDetails;
  loading: boolean;
  error: string | null;
}

export function MovieDetail({ id, data, loading, error }: MovieDetailProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "cast" | "reviews">(
    "overview"
  );

  if (loading) {
    return (
      <AppLayout>
        <DetailPageLayout loading={true}>
          <div className="text-center py-16">
            <p className="text-muted-foreground">Loading movie details...</p>
          </div>
        </DetailPageLayout>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <DetailPageLayout error="Failed to load movie details">
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
        <MovieDetailLayout movie={data} />
      </DetailPageLayout>

      <DetailPageLayout>
        <div className="space-y-8">
          {/* Tab Navigation */}
          <div className="flex space-x-1 border-b border-border">
            {[
              { key: "overview", label: "Overview" },
              { key: "cast", label: "Cast & Crew" },
              { key: "reviews", label: "Reviews" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Synopsis</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {data.overview}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Details</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">
                        Release Date:
                      </span>
                      <p className="font-medium">{data.release_date}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Runtime:</span>
                      <p className="font-medium">{data.runtime} min</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Rating:</span>
                      <p className="font-medium">{data.vote_average}/10</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Genre:</span>
                      <p className="font-medium">
                        {data.genres?.map((g) => g.name).join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "cast" && (
              <MovieCastList cast={data.credits?.cast || []} maxItems={12} />
            )}

            {activeTab === "reviews" && (
              <div className="text-center py-16 text-muted-foreground">
                <p>Reviews coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </DetailPageLayout>
    </AppLayout>
  );
}
