import { BrowseCarousel, HeroBanner } from "./index";
import { useBrowsePage } from "../hooks";

// ============================================================================
// BROWSE PAGE CONTENT - Handles the layout and rendering of browse sections
// ============================================================================

export function BrowsePageContent() {
  const {
    featuredContent,
    featuredMovies,
    featuredSeries,
    popularMovies,
    popularSeries,
    sections,
  } = useBrowsePage();

  return (
    <div className="space-y-12">
      {/* Hero Banner - Showcases featured content */}
      <HeroBanner featuredContent={featuredContent} />

      {/* Movies - Popular Section */}
      <BrowseCarousel
        title="Movies - Popular"
        items={popularMovies}
        loading={sections.popularMovies.loading}
        error={sections.popularMovies.error}
        showBadge={true}
        badgeText="Popular"
        badgeVariant="default"
      />

      {/* Series - Popular Section */}
      <BrowseCarousel
        title="Series - Popular"
        items={popularSeries}
        loading={sections.popularSeries.loading}
        error={sections.popularSeries.error}
        showBadge={true}
        badgeText="Popular"
        badgeVariant="default"
      />

      {/* Movies - Featured Section (Now Playing) */}
      <BrowseCarousel
        title="Movies - Featured"
        items={featuredMovies}
        loading={sections.nowPlayingMovies.loading}
        error={sections.nowPlayingMovies.error}
        showBadge={true}
        badgeText="Featured"
        badgeVariant="secondary"
      />

      {/* Series - Featured Section (On The Air) */}
      <BrowseCarousel
        title="Series - Featured"
        items={featuredSeries}
        loading={sections.onTheAirSeries.loading}
        error={sections.onTheAirSeries.error}
        showBadge={true}
        badgeText="Featured"
        badgeVariant="secondary"
      />
    </div>
  );
}
