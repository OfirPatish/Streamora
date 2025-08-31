"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Award } from "lucide-react";

// ============================================================================
// INTERFACES
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

// ============================================================================
// DETAIL PRODUCTION COMPONENT
// ============================================================================

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
    <section className="bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl p-8 border border-border/50">
      <div className="flex items-center gap-3 mb-8">
        <Award className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Production Details</h2>
      </div>

      <div className="space-y-6">
        {/* Production Companies */}
        {productionCompanies && productionCompanies.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
              Production Companies
            </h3>
            <div className="flex flex-wrap gap-2">
              {productionCompanies.slice(0, 5).map((company) => (
                <Badge key={company.id} variant="outline" className="text-sm font-medium">
                  {company.name}
                </Badge>
              ))}
              {productionCompanies.length > 5 && (
                <Badge variant="outline" className="text-sm font-medium text-muted-foreground">
                  +{productionCompanies.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Financial Information (Movies only) */}
        {type === "movie" && (budget || revenue) && (
          <>
            <Separator className="bg-border/50" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {budget && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Budget</h3>
                  <p className="text-sm font-medium">{formatCurrency(budget)}</p>
                </div>
              )}
              {revenue && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Revenue</h3>
                  <p className="text-sm font-medium">{formatCurrency(revenue)}</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Language Information */}
        {(originalLanguage || spokenLanguages?.length) && (
          <>
            <Separator className="bg-border/50" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {originalLanguage && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Original Language
                  </h3>
                  <p className="text-sm font-medium">{formatLanguage(originalLanguage)}</p>
                </div>
              )}
              {spokenLanguages && spokenLanguages.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Spoken Languages
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {spokenLanguages.slice(0, 3).map((lang) => (
                      <Badge key={lang.iso_639_1} variant="secondary" className="text-xs font-medium">
                        {lang.name}
                      </Badge>
                    ))}
                    {spokenLanguages.length > 3 && (
                      <Badge variant="secondary" className="text-xs font-medium text-muted-foreground">
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
            <Separator className="bg-border/50" />
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                Production Countries
              </h3>
              <div className="flex flex-wrap gap-2">
                {productionCountries.slice(0, 5).map((country) => (
                  <Badge key={country.iso_3166_1} variant="outline" className="text-sm font-medium">
                    {country.name}
                  </Badge>
                ))}
                {productionCountries.length > 5 && (
                  <Badge variant="outline" className="text-sm font-medium text-muted-foreground">
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
