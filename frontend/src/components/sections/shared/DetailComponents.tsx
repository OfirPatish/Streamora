"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Play, ExternalLink } from "lucide-react";
import { getTMDBImageUrl } from "@/lib/api";

// ============================================================================
// DETAIL BANNER COMPONENT
// ============================================================================

interface DetailBannerProps {
  title: string;
  overview?: string;
  backdropPath?: string | null;
  homepage?: string | null;
  videos?: Array<{
    key: string;
    name: string;
    site: string;
    type: string;
  }>;
}

export function DetailBanner({ title, overview, backdropPath, homepage, videos }: DetailBannerProps) {
  const [showTrailer, setShowTrailer] = useState(false);

  // Find the first YouTube trailer
  const trailer = videos?.find((video) => video.site === "YouTube" && video.type === "Trailer");
  const bannerUrl = backdropPath ? getTMDBImageUrl(backdropPath, "backdrop", "large") : null;

  return (
    <>
      {/* Banner Section */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg">
        {bannerUrl ? (
          <img src={bannerUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50" />
        )}

        {/* Simple Overlay for Text Readability */}
        <div className="absolute inset-0 bg-background/60" />

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 drop-shadow-lg">{title}</h1>

            {overview && (
              <p className="text-foreground/90 text-sm md:text-base mb-6 line-clamp-2 max-w-2xl drop-shadow-md">
                {overview}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              {trailer && (
                <Button
                  onClick={() => setShowTrailer(true)}
                  size="lg"
                  className="bg-primary/20 hover:bg-primary/30 text-primary-foreground border-primary/30 backdrop-blur-sm"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch Trailer
                </Button>
              )}

              {homepage && (
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="bg-muted/10 hover:bg-muted/20 text-foreground border-border backdrop-blur-sm"
                >
                  <a href={homepage} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Official Site
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-foreground hover:text-foreground/80"
            >
              ✕
            </Button>
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title={trailer.name}
              className="w-full h-full rounded-lg"
              allowFullScreen
              allow="autoplay; encrypted-media"
            />
          </div>
        </div>
      )}
    </>
  );
}

// ============================================================================
// DETAIL CAST COMPONENT
// ============================================================================

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string | null;
  order?: number;
}

interface DetailCastProps {
  cast?: CastMember[];
  title?: string;
  maxItems?: number;
}

export function DetailCast({ cast, title = "Cast", maxItems = 8 }: DetailCastProps) {
  if (!cast || cast.length === 0) {
    return null;
  }

  const displayCast = cast.sort((a, b) => (a.order || 0) - (b.order || 0)).slice(0, maxItems);

  return (
    <section className="bg-muted/50 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {displayCast.map((member, index) => {
          const profileUrl = member.profile_path ? getTMDBImageUrl(member.profile_path, "profile", "medium") : null;

          const initials = member.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return (
            <div key={`${member.id}-${member.name}-${index}`} className="text-center group">
              <div className="relative mb-3">
                <Avatar className="w-16 h-16 mx-auto group-hover:scale-105 transition-transform duration-200">
                  <AvatarImage src={profileUrl || undefined} alt={member.name} className="object-cover" />
                  <AvatarFallback className="bg-muted text-muted-foreground text-sm font-medium">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                  {member.name}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2">{member.character}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ============================================================================
// DETAIL INFO COMPONENT
// ============================================================================

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

        {/* Status */}
        {status && (
          <>
            <Separator />
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
              <p className="text-sm">{status}</p>
            </div>
          </>
        )}

        {/* Rating */}
        {voteAverage && (
          <>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Rating</h3>
                <p className="text-sm">{formatVoteAverage(voteAverage)}/10</p>
              </div>
              {voteCount && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Votes</h3>
                  <p className="text-sm">{voteCount.toLocaleString()}</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Networks (Series only) */}
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

// ============================================================================
// DETAIL PRODUCTION COMPONENT
// ============================================================================

interface ProductionCompany {
  id: number;
  name: string;
  logo_path?: string | null;
  origin_country?: string;
}

interface DetailProductionProps {
  productionCompanies?: ProductionCompany[];
  budget?: number;
  revenue?: number;
  originalLanguage?: string;
  productionCountries?: Array<{ iso_3166_1: string; name: string }>;
  spokenLanguages?: Array<{ iso_639_1: string; name: string }>;
  type: "movie" | "series";
}

export function DetailProduction({
  productionCompanies,
  budget,
  revenue,
  originalLanguage,
  productionCountries,
  spokenLanguages,
  type,
}: DetailProductionProps) {
  const formatCurrency = (amount?: number) => {
    if (!amount || amount === 0) return "Unknown";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatLanguage = (code?: string) => {
    if (!code) return "Unknown";
    const languageNames = new Intl.DisplayNames(["en"], { type: "language" });
    return languageNames.of(code) || code.toUpperCase();
  };

  const hasProductionData =
    productionCompanies?.length ||
    budget ||
    revenue ||
    originalLanguage ||
    productionCountries?.length ||
    spokenLanguages?.length;

  if (!hasProductionData) {
    return null;
  }

  return (
    <section className="bg-muted/50 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Production Details</h2>

      <div className="space-y-4">
        {/* Production Companies */}
        {productionCompanies && productionCompanies.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Production Companies</h3>
            <div className="flex flex-wrap gap-2">
              {productionCompanies.slice(0, 5).map((company) => (
                <Badge key={company.id} variant="outline">
                  {company.name}
                </Badge>
              ))}
              {productionCompanies.length > 5 && (
                <Badge variant="outline" className="text-muted-foreground">
                  +{productionCompanies.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Financial Information (Movies only) */}
        {type === "movie" && (budget || revenue) && (
          <>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {budget && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Budget</h3>
                  <p className="text-sm">{formatCurrency(budget)}</p>
                </div>
              )}
              {revenue && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Revenue</h3>
                  <p className="text-sm">{formatCurrency(revenue)}</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Language Information */}
        {(originalLanguage || spokenLanguages?.length) && (
          <>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {originalLanguage && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Original Language</h3>
                  <p className="text-sm">{formatLanguage(originalLanguage)}</p>
                </div>
              )}
              {spokenLanguages && spokenLanguages.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Spoken Languages</h3>
                  <div className="flex flex-wrap gap-1">
                    {spokenLanguages.slice(0, 3).map((lang) => (
                      <Badge key={lang.iso_639_1} variant="secondary" className="text-xs">
                        {lang.name}
                      </Badge>
                    ))}
                    {spokenLanguages.length > 3 && (
                      <Badge variant="secondary" className="text-xs text-muted-foreground">
                        +{spokenLanguages.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Production Countries */}
        {productionCountries && productionCountries.length > 0 && (
          <>
            <Separator />
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Production Countries</h3>
              <div className="flex flex-wrap gap-2">
                {productionCountries.slice(0, 5).map((country) => (
                  <Badge key={country.iso_3166_1} variant="outline">
                    {country.name}
                  </Badge>
                ))}
                {productionCountries.length > 5 && (
                  <Badge variant="outline" className="text-muted-foreground">
                    +{productionCountries.length - 5} more
                  </Badge>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
