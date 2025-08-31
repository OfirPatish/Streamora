"use client";

import { Badge } from "@/components/ui/badge";
import { Building2, Globe } from "lucide-react";

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
  originalLanguage?: string;
  productionCountries?: Array<{ iso_3166_1: string; name: string }>;
  type: "movie" | "series";
}

// ============================================================================
// DETAIL PRODUCTION COMPONENT
// ============================================================================

export function DetailProduction({
  productionCompanies,
  originalLanguage,
  productionCountries,
  type,
}: DetailProductionProps) {
  const formatLanguage = (code?: string) => {
    if (!code || code === "Unknown" || code === "TBA" || code === "en") return null; // Don't show English
    const languageNames = new Intl.DisplayNames(["en"], { type: "language" });
    return languageNames.of(code) || code.toUpperCase();
  };

  // Only show essential production data
  const hasProductionCompanies =
    productionCompanies &&
    productionCompanies.length > 0 &&
    productionCompanies.some((company) => company.name && company.name.trim() !== "");

  const hasOriginalLanguage = originalLanguage && formatLanguage(originalLanguage);

  const hasProductionCountries =
    productionCountries &&
    productionCountries.length > 0 &&
    productionCountries.some(
      (country) => country.name && country.name.trim() !== "" && country.iso_3166_1 !== "US" // Don't show US for English content
    );

  // Only show if we have meaningful production data
  const hasProductionData = hasProductionCompanies || hasOriginalLanguage || hasProductionCountries;

  if (!hasProductionData) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Production Companies - Only if we have them */}
      {hasProductionCompanies && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            Production Companies
          </h3>
          <div className="flex flex-wrap gap-2">
            {productionCompanies
              .filter((company) => company.name && company.name.trim() !== "")
              .slice(0, 4)
              .map((company) => (
                <Badge key={company.id} variant="outline" className="text-sm font-medium px-3 py-1.5">
                  {company.name}
                </Badge>
              ))}
            {productionCompanies.filter((company) => company.name && company.name.trim() !== "").length > 4 && (
              <Badge variant="outline" className="text-sm font-medium text-muted-foreground px-3 py-1.5">
                +{productionCompanies.filter((company) => company.name && company.name.trim() !== "").length - 4}
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Key Information Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Language Information - Only if meaningful */}
        {hasOriginalLanguage && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Language</h3>
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Original Language</p>
                <p className="text-sm text-muted-foreground">{formatLanguage(originalLanguage)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Production Countries - Only if important and meaningful */}
        {hasProductionCountries && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Production Country</h3>
            <div className="space-y-3">
              {productionCountries
                .filter((country) => country.name && country.name.trim() !== "" && country.iso_3166_1 !== "US")
                .slice(0, 2)
                .map((country) => (
                  <div key={country.iso_3166_1} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Country</p>
                      <p className="text-sm text-muted-foreground">{country.name}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
