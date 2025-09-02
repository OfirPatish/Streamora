import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Film, Tv, X } from "lucide-react";

interface SearchFiltersProps {
  filters: any;
  onFiltersChange: (filters: any) => void;
  resultsCount: number;
}

export function SearchFilters({ filters, onFiltersChange, resultsCount }: SearchFiltersProps) {
  const filterTypes = [
    { value: "all", label: "All", icon: null },
    { value: "movie", label: "Movies", icon: Film },
    { value: "series", label: "TV Shows", icon: Tv },
  ] as const;

  const hasActiveFilters = filters.type !== "all" || filters.year || filters.genre || filters.rating;

  const clearAllFilters = () => {
    onFiltersChange({ type: "all" });
  };

  return (
    <div className="space-y-4">
      {/* Type Filters */}
      <div className="flex flex-wrap gap-2">
        {filterTypes.map((filterType) => {
          const Icon = filterType.icon;
          const isActive = filters.type === filterType.value;

          return (
            <Button
              key={filterType.value}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => onFiltersChange({ ...filters, type: filterType.value })}
              className="gap-2"
            >
              {Icon && <Icon className="h-4 w-4" />}
              {filterType.label}
            </Button>
          );
        })}
      </div>

      {/* Active Filters & Results Count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{resultsCount} results</span>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-auto p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3 mr-1" />
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.type !== "all" && (
            <Badge variant="secondary" className="gap-1">
              Type: {filterTypes.find((f) => f.value === filters.type)?.label}
              <button
                onClick={() => onFiltersChange({ ...filters, type: "all" })}
                className="ml-1 hover:bg-muted rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.year && (
            <Badge variant="secondary" className="gap-1">
              Year: {filters.year}
              <button
                onClick={() => onFiltersChange({ ...filters, year: undefined })}
                className="ml-1 hover:bg-muted rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.genre && (
            <Badge variant="secondary" className="gap-1">
              Genre: {filters.genre}
              <button
                onClick={() => onFiltersChange({ ...filters, genre: undefined })}
                className="ml-1 hover:bg-muted rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
