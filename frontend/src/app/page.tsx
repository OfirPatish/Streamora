import { PageTemplate } from "@/components/layout/PageTemplate";

export default function Home() {
  return (
    <PageTemplate>
      {/* Simple Landing Page */}
      <div className="w-full min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        {/* Hero Section */}
        <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-background">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-background/80" />

          <div className="relative h-full flex items-center justify-center sm:justify-start">
            <div className="max-w-[1400px] mx-auto px-8 w-full">
              <div className="text-center sm:text-left">
                <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-foreground mb-6">
                  Welcome to Streamora
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mb-8">
                  Your ultimate destination for movies and TV shows. Discover,
                  explore, and enjoy endless entertainment.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                  <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors">
                    Explore Movies & Shows
                  </button>
                  <button className="px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold text-lg hover:bg-secondary/90 transition-colors">
                    Browse Genres
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
        </div>

        {/* Content Area - Empty for now */}
        <div className="max-w-[1400px] mx-auto px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Content Coming Soon</h2>
            <p className="text-muted-foreground text-lg">
              This area will showcase featured content, trending movies, and
              popular TV shows.
            </p>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
