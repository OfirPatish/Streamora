"use client";

import { PageTemplate } from "@/components/layout/PageTemplate";
import { ListingPageWrapper } from "@/components/layout/ListingPageWrapper";
import {
  useBrowseNowPlayingMovies,
  useBrowseOnTheAirSeries,
  useBrowsePopularMovies,
  useBrowsePopularSeries,
  BrowseCarousel,
  HeroBanner,
  transformMovieData,
  transformSeriesData,
  createFeaturedContent,
} from "@/features/browse";

export default function BrowsePage() {
  // Fetch data for different sections using only existing endpoints
  const nowPlayingMovies = useBrowseNowPlayingMovies();
  const onTheAirSeries = useBrowseOnTheAirSeries();
  const popularMovies = useBrowsePopularMovies();
  const popularSeries = useBrowsePopularSeries();

  // Transform data for display
  const featuredMovies = transformMovieData(nowPlayingMovies.items);
  const featuredSeries = transformSeriesData(onTheAirSeries.items);
  const popularMoviesData = transformMovieData(popularMovies.items);
  const popularSeriesData = transformSeriesData(popularSeries.items);

  // Create featured content for hero banner (mix of movies and series)
  const featuredContent = createFeaturedContent(nowPlayingMovies.items, onTheAirSeries.items);

  return (
    <PageTemplate>
      <ListingPageWrapper
        title="🎬 Browse"
        subtitle="Discover the latest movies and TV series"
        loading={false}
        error={null}
      >
        <div className="space-y-12">
          {/* Hero Banner - Showcases featured content */}
          <HeroBanner featuredContent={featuredContent} />

          {/* Movies - Popular Section */}
          <BrowseCarousel
            title="Movies - Popular"
            items={popularMoviesData}
            loading={popularMovies.loading}
            error={popularMovies.error}
            showBadge={true}
            badgeText="Popular"
            badgeVariant="default"
          />

          {/* Series - Popular Section */}
          <BrowseCarousel
            title="Series - Popular"
            items={popularSeriesData}
            loading={popularSeries.loading}
            error={popularSeries.error}
            showBadge={true}
            badgeText="Popular"
            badgeVariant="default"
          />

          {/* Movies - Featured Section (Now Playing) */}
          <BrowseCarousel
            title="Movies - Featured"
            items={featuredMovies}
            loading={nowPlayingMovies.loading}
            error={nowPlayingMovies.error}
            showBadge={true}
            badgeText="Featured"
            badgeVariant="secondary"
          />

          {/* Series - Featured Section (On The Air) */}
          <BrowseCarousel
            title="Series - Featured"
            items={featuredSeries}
            loading={onTheAirSeries.loading}
            error={onTheAirSeries.error}
            showBadge={true}
            badgeText="Featured"
            badgeVariant="secondary"
          />
        </div>
      </ListingPageWrapper>
    </PageTemplate>
  );
}
