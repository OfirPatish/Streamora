import { Star, Calendar, Film, Tv } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getTMDBImageUrl } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

interface SearchResultsProps {
  results: any[];
  isLoading: boolean;
  query: string;
}

export function SearchResults({
  results,
  isLoading,
  query,
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} />
        ))}
      </div>
    );
  }

  if (!query.trim()) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Film className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>Start typing to search for movies, TV shows, and people</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Film className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No results found for "{query}"</p>
        <p className="text-sm mt-2">Try searching for something else</p>
      </div>
    );
  }

  const getTypeIcon = (type: any) => {
    switch (type) {
      case "movie":
        return <Film className="h-4 w-4" />;
      case "series":
        return <Tv className="h-4 w-4" />;
      default:
        return <Film className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: any) => {
    switch (type) {
      case "movie":
        return "bg-primary";
      case "series":
        return "bg-secondary";
      default:
        return "bg-muted";
    }
  };

  const getResultLink = (result: any) => {
    switch (result.type) {
      case "movie":
        return `/movies/${result.id}`;
      case "series":
        return `/series/${result.id}`;
      default:
        return "#";
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-4">
        Found {results.length} result{results.length !== 1 ? "s" : ""} for "
        {query}"
      </div>

      {results.map((result) => (
        <Link key={result.id} href={getResultLink(result)}>
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer group">
            <CardContent className="p-4">
              <div className="flex gap-4">
                {/* TMDB Image */}
                <div className="w-16 h-24 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                  {result.poster_path ? (
                    <Image
                      src={
                        getTMDBImageUrl(
                          result.poster_path || null,
                          "poster",
                          "small"
                        ) || ""
                      }
                      alt={result.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : (
                    getTypeIcon(result.type)
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-2">
                    <h3 className="font-semibold text-foreground group-hover:text-foreground/80 truncate">
                      {result.title}
                    </h3>
                    <Badge
                      className={`${getTypeColor(
                        result.type
                      )} text-primary-foreground text-xs flex items-center gap-1`}
                    >
                      {getTypeIcon(result.type)}
                      {result.type}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    {result.year && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {result.year}
                      </div>
                    )}
                    {result.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {result.rating}
                      </div>
                    )}
                  </div>

                  {result.overview && (
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {result.overview}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
