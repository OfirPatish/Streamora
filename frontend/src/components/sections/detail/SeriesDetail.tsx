import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Play, Star, Calendar, Users, Info, Tv } from "lucide-react";
import { useSeriesDetails } from "@/hooks";
import { getTMDBImageUrl } from "@/lib/api";
import Image from "next/image";

interface SeriesDetailProps {
  id: string;
}

export function SeriesDetail({ id }: SeriesDetailProps) {
  const { data: series, loading, error } = useSeriesDetails(parseInt(id));

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error || !series) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 mb-4">Failed to load series details</div>
        <div className="text-gray-400">Series ID: {id}</div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Hero Section */}
      <div className="relative h-96 rounded-lg overflow-hidden border w-full">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <div className="flex items-center gap-2 mb-4">
            {series.genres.map((genre) => (
              <Badge key={genre.id} variant="secondary">
                {genre.name}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl font-bold mb-2">{series.name}</h1>
          <p className="text-lg mb-4 max-w-2xl">{series.overview}</p>
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{series.vote_average.toFixed(1)}</span>
              <span className="text-muted-foreground">({series.vote_count.toLocaleString()})</span>
            </div>
            <div className="flex items-center gap-2">
              <Tv className="h-4 w-4" />
              <span>{series.number_of_seasons} Seasons</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(series.first_air_date).getFullYear()}</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <Button size="lg">
              <Play className="h-4 w-4 mr-2" />
              Watch Now
            </Button>
            <Button variant="outline" size="lg">
              <Info className="h-4 w-4 mr-2" />
              More Info
            </Button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cast Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Cast</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {series.credits.cast.slice(0, 8).map((actor) => (
                <div key={actor.id} className="text-center">
                  <div className="w-16 h-16 rounded-full border mx-auto mb-2 flex items-center justify-center">
                    <Users className="h-6 w-6" />
                  </div>
                  <p className="font-medium text-sm">{actor.name}</p>
                  <p className="text-xs text-muted-foreground">{actor.character}</p>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* Seasons Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Seasons</h2>
            <div className="space-y-4">
              {series.seasons.map((season) => (
                <div key={season.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{season.name}</h3>
                    <Badge variant="outline">{season.episode_count} Episodes</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{season.overview}</p>
                  <p className="text-xs text-muted-foreground">
                    Air Date: {new Date(season.air_date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* Videos Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {series.videos.results.map((video) => (
                <div key={video.key} className="border rounded-lg p-4">
                  <div className="aspect-video bg-muted rounded mb-2 flex items-center justify-center">
                    <Play className="h-8 w-8" />
                  </div>
                  <h3 className="font-medium">{video.name}</h3>
                  <p className="text-sm text-muted-foreground">{video.type}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Series Info */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Series Info</h3>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-muted-foreground">Status:</span>
                <p className="font-medium">{series.status}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Type:</span>
                <p className="font-medium">{series.type}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">First Air Date:</span>
                <p className="font-medium">{new Date(series.first_air_date).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Last Air Date:</span>
                <p className="font-medium">{new Date(series.last_air_date).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Seasons:</span>
                <p className="font-medium">{series.number_of_seasons}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Episodes:</span>
                <p className="font-medium">{series.number_of_episodes}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Popularity:</span>
                <p className="font-medium">{series.popularity.toFixed(1)}</p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Networks */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Networks</h3>
            <div className="space-y-2">
              {series.networks.map((network) => (
                <div key={network.name} className="text-sm">
                  {network.name}
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* Production Companies */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Production Companies</h3>
            <div className="space-y-2">
              {series.production_companies.map((company) => (
                <div key={company.name} className="text-sm">
                  {company.name}
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* Crew */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Crew</h3>
            <div className="space-y-2">
              {series.credits.crew.slice(0, 5).map((member) => (
                <div key={member.id}>
                  <p className="font-medium text-sm">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.job}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
