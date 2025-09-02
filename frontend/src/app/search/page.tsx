"use client";

import { PageTemplate } from "@/components/layout/PageTemplate";
import { ListingPageWrapper } from "@/components/layout/ListingPageWrapper";
import { SearchResults, SearchFilters } from "@/features/search";
import { Typography } from "@/components/ui/typography";

export default function SearchPage() {
  return (
    <PageTemplate>
      <ListingPageWrapper
        title="🔍 Search Results"
        subtitle="Search functionality coming soon - components are ready"
        loading={false}
        error={null}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Search Filters */}
          <SearchFilters
            filters={{}}
            onFiltersChange={() => {}}
            resultsCount={0}
          />

          {/* Search Results */}
          <SearchResults results={[]} isLoading={false} query="" />
        </div>
      </ListingPageWrapper>
    </PageTemplate>
  );
}
