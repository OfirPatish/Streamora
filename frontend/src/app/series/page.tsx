import { PageTemplate } from "@/components/layout/PageTemplate";
import { ListingPageWrapper } from "@/components/layout/ListingPageWrapper";
import { ContentService } from "@/services";

export default async function SeriesPage() {
  const seriesData = await ContentService.getPopularSeries();

  return (
    <PageTemplate>
      <ListingPageWrapper showHero={false}>
        {/* TODO: Replace with browse components or custom series list */}
        <div className="text-center py-16 text-muted-foreground">
          Series list component will be implemented here
          <br />
          <small>Loaded {seriesData.data.length} series</small>
        </div>
      </ListingPageWrapper>
    </PageTemplate>
  );
}
