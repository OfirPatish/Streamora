import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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

  const hasProductionData = productionCompanies?.length || budget || revenue || originalLanguage || productionCountries?.length || spokenLanguages?.length;

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
                        +{spokenLanguages.length - 3}
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
