import { PageTemplate } from "@/components/layout/PageTemplate";
import { ListingPageWrapper } from "@/components/layout/ListingPageWrapper";
import { ContentService } from "@/services";

export default async function MoviesPage() {
  const moviesData = await ContentService.getPopularMovies();

  return (
    <PageTemplate>
      <ListingPageWrapper showHero={false}>
        {/* TODO: Replace with browse components or custom movie list */}
        <div className="text-center py-16 text-muted-foreground">
          Movie list component will be implemented here
          <br />
          <small>Loaded {moviesData.data.length} movies</small>
        </div>
      </ListingPageWrapper>
    </PageTemplate>
  );
}
