"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DesktopHeader, MobileHeader, MobileBottomNav } from "@/components/layout";
import { SearchResults, SearchFilters, useSearch } from "@/components/features/search";
import { Typography } from "@/components/ui/typography";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const { query, setQuery, results, isLoading, filters, setFilters } = useSearch();

  // Set initial query from URL params
  useEffect(() => {
    if (initialQuery && initialQuery !== query) {
      setQuery(initialQuery);
    }
  }, [initialQuery, query, setQuery]);

  return (
    <div className="min-h-screen w-full">
      <DesktopHeader />
      <MobileHeader />

      <main className="pb-20 lg:pb-0 px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="space-y-2">
            <Typography variant="h2" className="text-white">
              Search Results
            </Typography>
            {query && <Typography variant="muted">Showing results for "{query}"</Typography>}
          </div>

          {/* Search Filters */}
          <SearchFilters filters={filters} onFiltersChange={setFilters} resultsCount={results.length} />

          {/* Search Results */}
          <SearchResults results={results} isLoading={isLoading} query={query} />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
