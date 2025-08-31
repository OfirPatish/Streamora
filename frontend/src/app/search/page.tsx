"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { PageTemplate } from "@/components/layout/PageTemplate";
import { ListingPageWrapper } from "@/components/layout/ListingPageWrapper";
import { SearchResultsList, SearchFilters } from "@/features/search";
import { useSearch } from "@/features/search";
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
    <PageTemplate>
      <ListingPageWrapper
        title="🔍 Search Results"
        subtitle={query ? `Showing results for "${query}"` : "Search for movies and TV shows"}
        loading={isLoading}
        error={null}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Search Filters */}
          <SearchFilters filters={filters} onFiltersChange={setFilters} resultsCount={results.length} />

          {/* Search Results */}
          <SearchResultsList results={results} isLoading={isLoading} query={query} />
        </div>
      </ListingPageWrapper>
    </PageTemplate>
  );
}
