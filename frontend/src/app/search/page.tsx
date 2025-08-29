"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SearchResults } from "@/components/search/SearchResults";
import { SearchFilters } from "@/components/search/SearchFilters";
import { useSearch } from "@/hooks/api/useSearch";
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
    <div className="min-h-screen w-full bg-background">
      <DesktopHeader />
      <MobileHeader />

      <main className="pb-20 lg:pb-0 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="space-y-2">
              <Typography variant="h2" className="text-foreground">
                Search Results
              </Typography>
              {query && <Typography variant="muted">Showing results for "{query}"</Typography>}
            </div>

            {/* Search Filters */}
            <SearchFilters filters={filters} onFiltersChange={setFilters} resultsCount={results.length} />

            {/* Search Results */}
            <SearchResults results={results} isLoading={isLoading} query={query} />
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
