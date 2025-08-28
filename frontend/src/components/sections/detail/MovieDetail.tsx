import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Play, Star, Clock, Calendar, Users, Info } from "lucide-react";

interface MovieDetailProps {
  id: string;
}

export function MovieDetail({ id }: MovieDetailProps) {
  // Mock data based on backend API structure
  const movie = {
    id: parseInt(id),
    title: "The Dark Knight",
    original_title: "The Dark Knight",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    tagline: "Why So Serious?",
    release_date: "2008-07-18",
    runtime: 152,
    status: "Released",
    vote_average: 9.0,
    vote_count: 30000,
    popularity: 100.0,
    genres: [
      { id: 28, name: "Action" },
      { id: 18, name: "Drama" },
      { id: 80, name: "Crime" }
    ],
    production_companies: [
      { name: "Warner Bros. Pictures", logo_path: null },
      { name: "Legendary Pictures", logo_path: null }
    ],
    credits: {
      cast: [
        { id: 1, name: "Christian Bale", character: "Bruce Wayne / Batman", profile_path: null },
        { id: 2, name: "Heath Ledger", character: "Joker", profile_path: null },
        { id: 3, name: "Aaron Eckhart", character: "Harvey Dent", profile_path: null },
        { id: 4, name: "Maggie Gyllenhaal", character: "Rachel Dawes", profile_path: null }
      ],
      crew: [
        { id: 1, name: "Christopher Nolan", job: "Director", department: "Directing" },
        { id: 2, name: "Jonathan Nolan", job: "Screenplay", department: "Writing" }
      ]
    },
    videos: {
      results: [
        { key: "abc123", name: "Official Trailer", site: "YouTube", type: "Trailer" },
        { key: "def456", name: "Behind the Scenes", site: "YouTube", type: "Featurette" }
      ]
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Hero Section */}
      <div className="relative h-96 rounded-lg overflow-hidden border w-full">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <div className="flex items-center gap-2 mb-4">
            {movie.genres.map((genre) => (
              <Badge key={genre.id} variant="secondary">
                {genre.name}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-lg mb-4 max-w-2xl">{movie.overview}</p>
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
              <span className="text-muted-foreground">({movie.vote_count.toLocaleString()})</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{movie.runtime} min</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(movie.release_date).getFullYear()}</span>
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
              {movie.credits.cast.slice(0, 8).map((actor) => (
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

          {/* Videos Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {movie.videos.results.map((video) => (
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
          {/* Production Info */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Production</h3>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-muted-foreground">Status:</span>
                <p className="font-medium">{movie.status}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Release Date:</span>
                <p className="font-medium">{new Date(movie.release_date).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Runtime:</span>
                <p className="font-medium">{movie.runtime} minutes</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Popularity:</span>
                <p className="font-medium">{movie.popularity.toFixed(1)}</p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Production Companies */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Production Companies</h3>
            <div className="space-y-2">
              {movie.production_companies.map((company) => (
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
              {movie.credits.crew.slice(0, 5).map((member) => (
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
