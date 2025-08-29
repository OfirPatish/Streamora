import { Clock } from "lucide-react";

interface SearchSuggestionsProps {
  recentSearches: string[];
  onSelect: (query: string) => void;
  isVisible: boolean;
}

export function SearchSuggestions({ recentSearches, onSelect, isVisible }: SearchSuggestionsProps) {
  if (!isVisible || recentSearches.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-xl z-[99999] max-h-96 overflow-y-auto">
      <div className="p-2">
        <div className="text-xs text-muted-foreground px-3 py-1 mb-1">Recent Searches</div>
        {recentSearches.map((searchQuery, index) => (
          <button
            key={index}
            onClick={() => onSelect(searchQuery)}
            className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-muted rounded-md transition-colors group"
          >
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <div className="text-foreground group-hover:text-foreground/80 truncate">{searchQuery}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-border p-2 text-xs text-muted-foreground text-center">
        <span>Press Enter to search • ESC to close</span>
      </div>
    </div>
  );
}
