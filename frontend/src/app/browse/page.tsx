"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { BrowsePageLayout } from "@/components/layout/BrowsePageLayout";
import { BrowsePageContent, useBrowsePage } from "@/features/browse";

export default function BrowsePage() {
  const { loading, error } = useBrowsePage();

  return (
    <AppLayout>
      <BrowsePageLayout
        subtitle="Discover the latest movies and TV series"
        loading={loading}
        error={error}
      >
        <BrowsePageContent />
      </BrowsePageLayout>
    </AppLayout>
  );
}
