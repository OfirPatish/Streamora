"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { BrowsePageLayout } from "@/components/layout/BrowsePageLayout";
import {
  SearchSuggestions,
  SearchFilters,
  SearchResults,
} from "@/features/search";

export default function SearchPage() {
  return (
    <AppLayout>
      <BrowsePageLayout
        title="🔍 Search"
        subtitle="Find your favorite movies and TV series"
        loading={false}
        error={null}
      >
        <div className="space-y-8">
          {/* Search Input and Filters */}
          <div className="space-y-6">
            <SearchSuggestions
              recentSearches={[]}
              onSelect={() => {}}
              isVisible={false}
            />
            <SearchFilters
              filters={{}}
              onFiltersChange={() => {}}
              resultsCount={0}
            />
          </div>

          {/* Search Results */}
          <SearchResults results={[]} isLoading={false} query="" />
        </div>
      </BrowsePageLayout>
    </AppLayout>
  );
}
