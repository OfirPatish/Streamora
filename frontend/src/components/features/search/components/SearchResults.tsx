import { SearchResult } from "../types";
import { Star, Calendar, Film, Tv } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getTMDBImageUrl } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  query: string;
}

export function SearchResults({ results, isLoading, query }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }, (_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-16 h-24 bg-gray-700 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-700 rounded w-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!query.trim()) {
    return (
      <div className="text-center py-12 text-gray-400">
        <Film className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>Start typing to search for movies, TV shows, and people</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <Film className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No results found for "{query}"</p>
        <p className="text-sm mt-2">Try searching for something else</p>
      </div>
    );
  }

  const getTypeIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "movie":
        return <Film className="h-4 w-4" />;
      case "series":
        return <Tv className="h-4 w-4" />;
      default:
        return <Film className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: SearchResult["type"]) => {
    switch (type) {
      case "movie":
        return "bg-blue-600";
      case "series":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  const getResultLink = (result: SearchResult) => {
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
      <div className="text-sm text-gray-400 mb-4">
        Found {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
      </div>

      {results.map((result) => (
        <Link key={result.id} href={getResultLink(result)}>
          <Card className="hover:bg-gray-800/50 transition-colors cursor-pointer group">
            <CardContent className="p-4">
              <div className="flex gap-4">
                {/* TMDB Image */}
                <div className="w-16 h-24 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                  {result.poster_path ? (
                    <Image
                      src={getTMDBImageUrl(result.poster_path || null, "poster", "small") || ""}
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
                    <h3 className="font-semibold text-white group-hover:text-gray-100 truncate">{result.title}</h3>
                    <Badge className={`${getTypeColor(result.type)} text-white text-xs flex items-center gap-1`}>
                      {getTypeIcon(result.type)}
                      {result.type}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
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

                  {result.overview && <p className="text-gray-300 text-sm line-clamp-2">{result.overview}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
