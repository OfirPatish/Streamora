"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { PageTemplate } from "@/components/layout/PageTemplate";
import { ContentSection } from "@/components/layout/PageContentWrapper";
import { SearchResults } from "@/components/sections/search";
import { SearchFilters } from "@/components/sections/search";
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
    <PageTemplate>
      <ContentSection
        title="🔍 Search Results"
        subtitle={query ? `Showing results for "${query}"` : "Search for movies and TV shows"}
        loading={isLoading}
        error={null}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Search Filters */}
          <SearchFilters filters={filters} onFiltersChange={setFilters} resultsCount={results.length} />

          {/* Search Results */}
          <SearchResults results={results} isLoading={isLoading} query={query} />
        </div>
      </ContentSection>
    </PageTemplate>
  );
}
