import { AppLayout } from "@/components/layout/AppLayout";
import { Typography } from "@/components/ui/typography";

export default function HomePage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        {/* Hero Section */}
        <div className="relative w-full h-[60vh] min-h-[500px] overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-background">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-background/80" />

          <div className="relative h-full flex items-center justify-center">
            <div className="max-w-[1400px] mx-auto px-8 text-center">
              <Typography
                variant="h1"
                className="mb-6 text-5xl lg:text-7xl font-black tracking-tight"
              >
                Welcome to Streamora
              </Typography>
              <Typography
                variant="lead"
                className="text-white/80 mb-8 text-xl lg:text-2xl"
              >
                Your ultimate destination for discovering movies and TV series
              </Typography>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/browse"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Start Browsing
                </a>
                <a
                  href="/search"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
                >
                  Search Content
                </a>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
        </div>

        {/* Features Section */}
        <div className="max-w-[1400px] mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎬</span>
              </div>
              <Typography variant="h3" className="mb-2">
                Discover Movies
              </Typography>
              <Typography variant="body" className="text-muted-foreground">
                Explore the latest releases, classics, and hidden gems
              </Typography>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📺</span>
              </div>
              <Typography variant="h3" className="mb-2">
                TV Series
              </Typography>
              <Typography variant="body" className="text-muted-foreground">
                Binge-watch your favorite shows and discover new ones
              </Typography>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <Typography variant="h3" className="mb-2">
                Smart Search
              </Typography>
              <Typography variant="body" className="text-muted-foreground">
                Find exactly what you're looking for with advanced filters
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
