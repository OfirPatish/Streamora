import { SearchSuggestion } from "./types";
import { Clock, TrendingUp, Search } from "lucide-react";

interface SearchSuggestionsProps {
  suggestions: SearchSuggestion[];
  onSelect: (query: string) => void;
  isVisible: boolean;
}

export function SearchSuggestions({ suggestions, onSelect, isVisible }: SearchSuggestionsProps) {
  if (!isVisible || suggestions.length === 0) return null;

  const getIcon = (type: SearchSuggestion["type"]) => {
    switch (type) {
      case "recent":
        return <Clock className="h-4 w-4 text-gray-400" />;
      case "trending":
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      default:
        return <Search className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTypeLabel = (type: SearchSuggestion["type"], count?: number) => {
    switch (type) {
      case "recent":
        return "Recent";
      case "trending":
        return count ? `${count.toLocaleString()} searches` : "Trending";
      default:
        return "";
    }
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-[99999] max-h-96 overflow-y-auto">
      <div className="p-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            onClick={() => onSelect(suggestion.query)}
            className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-800 rounded-md transition-colors group"
          >
            {getIcon(suggestion.type)}
            <div className="flex-1 min-w-0">
              <div className="text-white group-hover:text-gray-100 truncate">{suggestion.query}</div>
              {(suggestion.type === "trending" || suggestion.type === "recent") && (
                <div className="text-xs text-gray-400 mt-0.5">{getTypeLabel(suggestion.type, suggestion.count)}</div>
              )}
            </div>
            {suggestion.type === "trending" && <div className="text-xs text-red-400 font-medium">🔥 Hot</div>}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-700 p-2 text-xs text-gray-400 text-center">
        <span>Press Enter to search • ESC to close</span>
      </div>
    </div>
  );
}
