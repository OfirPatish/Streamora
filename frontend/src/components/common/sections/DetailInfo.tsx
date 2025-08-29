import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface DetailInfoProps {
  genres?: Array<{ id: number; name: string }>;
  releaseDate?: string;
  runtime?: number;
  status?: string;
  voteAverage?: number;
  voteCount?: number;
  type: "movie" | "series";
  // Series-specific props
  numberOfSeasons?: number;
  numberOfEpisodes?: number;
  firstAirDate?: string;
  lastAirDate?: string;
  networks?: Array<{ id: number; name: string; logo_path?: string | null }>;
}

export function DetailInfo({
  genres,
  releaseDate,
  runtime,
  status,
  voteAverage,
  voteCount,
  type,
  numberOfSeasons,
  numberOfEpisodes,
  firstAirDate,
  lastAirDate,
  networks,
}: DetailInfoProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "TBA";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatRuntime = (minutes?: number) => {
    if (!minutes) return "TBA";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatVoteAverage = (average?: number) => {
    if (!average) return "N/A";
    return average.toFixed(1);
  };

  return (
    <section className="bg-muted/50 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Information</h2>
      
      <div className="space-y-4">
        {/* Genres */}
        {genres && genres.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {genres.slice(0, 3).map((genre) => (
                <Badge key={genre.id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Separator />

        {/* Release Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {type === "movie" ? (
            <>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Release Date</h3>
                <p className="text-sm">{formatDate(releaseDate)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Runtime</h3>
                <p className="text-sm">{formatRuntime(runtime)}</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">First Air Date</h3>
                <p className="text-sm">{formatDate(firstAirDate)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Last Air Date</h3>
                <p className="text-sm">{formatDate(lastAirDate)}</p>
              </div>
            </>
          )}
        </div>

        <Separator />

        {/* Status and Rating */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
            <p className="text-sm">{status || "Unknown"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Rating</h3>
            <p className="text-sm">
              {formatVoteAverage(voteAverage)} ⭐ ({voteCount?.toLocaleString() || 0} votes)
            </p>
          </div>
        </div>

        {/* Series-specific information */}
        {type === "series" && (numberOfSeasons || numberOfEpisodes) && (
          <>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {numberOfSeasons && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Seasons</h3>
                  <p className="text-sm">{numberOfSeasons}</p>
                </div>
              )}
              {numberOfEpisodes && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Episodes</h3>
                  <p className="text-sm">{numberOfEpisodes}</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Networks (for series) */}
        {type === "series" && networks && networks.length > 0 && (
          <>
            <Separator />
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Networks</h3>
              <div className="flex flex-wrap gap-2">
                {networks.map((network) => (
                  <Badge key={network.id} variant="outline">
                    {network.name}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
