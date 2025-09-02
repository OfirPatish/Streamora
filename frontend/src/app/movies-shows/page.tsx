"use client";

import { PageTemplate } from "@/components/layout/PageTemplate";
import { ListingPageWrapper } from "@/components/layout/ListingPageWrapper";
import { ContentDisplay } from "@/features/content";
import {
  useNowPlayingMovies,
  useTopRatedMovies,
  useOnTheAirSeries,
  useTopRatedSeries,
  HeroBanner,
} from "@/features/content";
import { Typography } from "@/components/ui/typography";
import {
  transformMovieData,
  transformSeriesData,
  createFeaturedContent,
} from "@/features/content/utils/transformers";

export default function MoviesShowsPage() {
  // Fetch data for different sections
  const nowPlayingMovies = useNowPlayingMovies();
  const topRatedMovies = useTopRatedMovies();
  const onTheAirSeries = useOnTheAirSeries();
  const topRatedSeries = useTopRatedSeries();

  // Debug: Log what we're getting
  console.log("Now Playing Movies:", nowPlayingMovies);
  console.log("Top Rated Movies:", topRatedMovies);
  console.log("On The Air Series:", onTheAirSeries);
  console.log("Top Rated Series:", topRatedSeries);

  // Transform data for display
  const trendingMovies = transformMovieData(nowPlayingMovies.data);
  const newReleases = transformMovieData(topRatedMovies.data);
  const mustWatchMovies = transformMovieData(topRatedMovies.data);
  const topRatedSeriesData = transformSeriesData(topRatedSeries.data);

  // Create featured content for hero banner (mix of movies and series)
  const featuredContent = createFeaturedContent(
    nowPlayingMovies.data,
    topRatedSeries.data
  );

  // Debug: Log transformed data
  console.log("Transformed Trending Movies:", trendingMovies);
  console.log("Transformed New Releases:", newReleases);

  return (
    <PageTemplate>
      <ListingPageWrapper
        title="🎬 Movies & Shows"
        subtitle="Discover the latest movies and TV series"
        loading={false}
        error={null}
      >
        <div className="space-y-12">
          {/* Hero Banner - Showcases multiple titles */}
          <HeroBanner featuredContent={featuredContent} />

          {/* Trending Now Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <Typography variant="h2" className="text-2xl font-bold">
                Trending Now
              </Typography>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors">
                  ←
                </button>
                <button className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors">
                  →
                </button>
              </div>
            </div>
            <ContentDisplay
              title="Trending Now"
              items={trendingMovies}
              loading={nowPlayingMovies.loading}
              error={nowPlayingMovies.error}
              showViewCount={true}
              showDuration={true}
            />
          </section>

          {/* New Releases Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <Typography variant="h2" className="text-2xl font-bold">
                New Releases
              </Typography>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors">
                  ←
                </button>
                <button className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors">
                  →
                </button>
              </div>
            </div>
            <ContentDisplay
              title="New Releases"
              items={newReleases}
              loading={topRatedMovies.loading}
              error={topRatedMovies.error}
              showReleaseDate={true}
            />
          </section>

          {/* Must Watch Movies Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <Typography variant="h2" className="text-2xl font-bold">
                Must Watch Movies
              </Typography>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors">
                  ←
                </button>
                <button className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors">
                  →
                </button>
              </div>
            </div>
            <ContentDisplay
              title="Must Watch Movies"
              items={mustWatchMovies}
              loading={topRatedMovies.loading}
              error={topRatedMovies.error}
              showRating={true}
              showDuration={true}
            />
          </section>

          {/* Top Rated Series Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <Typography variant="h2" className="text-2xl font-bold">
                Top Rated Series
              </Typography>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors">
                  ←
                </button>
                <button className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors">
                  →
                </button>
              </div>
            </div>
            <ContentDisplay
              title="Top Rated Series"
              items={topRatedSeriesData}
              showRating={true}
              showEpisodeCount={true}
            />
          </section>
        </div>
      </ListingPageWrapper>
    </PageTemplate>
  );
}
