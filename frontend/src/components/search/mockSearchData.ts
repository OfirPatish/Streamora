import { SearchResult, SearchSuggestion } from "./types";

// Mock search results - will be replaced with real API calls
export const mockSearchResults: SearchResult[] = [
  {
    id: 1,
    title: "The Dark Knight",
    type: "movie",
    year: "2008",
    overview: "Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and DA Harvey Dent.",
    rating: 9.0,
  },
  {
    id: 2,
    title: "Breaking Bad",
    type: "series",
    year: "2008",
    overview: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing drugs.",
    rating: 9.5,
  },
  {
    id: 3,
    title: "Christopher Nolan",
    type: "person",
    overview: "British-American film director, producer, and screenwriter known for complex narratives.",
  },
  {
    id: 4,
    title: "Inception",
    type: "movie",
    year: "2010",
    overview: "A thief who steals corporate secrets through dream-sharing technology.",
    rating: 8.8,
  },
  {
    id: 5,
    title: "Stranger Things",
    type: "series",
    year: "2016",
    overview: "When a young boy vanishes, a small town uncovers a mystery involving supernatural forces.",
    rating: 8.7,
  },
  {
    id: 6,
    title: "The Matrix",
    type: "movie",
    year: "1999",
    overview: "A computer programmer discovers that reality as he knows it is a simulation.",
    rating: 8.7,
  },
];

// Mock search suggestions
export const mockSearchSuggestions: SearchSuggestion[] = [
  { id: "1", query: "batman", type: "trending", count: 1250 },
  { id: "2", query: "marvel", type: "trending", count: 980 },
  { id: "3", query: "stranger things", type: "recent" },
  { id: "4", query: "christopher nolan", type: "recent" },
  { id: "5", query: "sci-fi movies 2024", type: "suggestion" },
  { id: "6", query: "netflix series", type: "suggestion" },
  { id: "7", query: "action movies", type: "trending", count: 750 },
  { id: "8", query: "horror films", type: "suggestion" },
];

// Mock function to simulate API search
export const mockSearchAPI = async (query: string, filters?: any): Promise<SearchResult[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!query.trim()) return [];

  // Filter results based on query
  const filtered = mockSearchResults.filter(
    (result) =>
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.overview?.toLowerCase().includes(query.toLowerCase())
  );

  // Apply type filter if provided
  if (filters?.type && filters.type !== "all") {
    return filtered.filter((result) => result.type === filters.type);
  }

  return filtered;
};

// Mock function to get search suggestions
export const mockSuggestionsAPI = async (query: string): Promise<SearchSuggestion[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  if (!query.trim()) {
    // Return recent and trending when no query
    return mockSearchSuggestions.filter((s) => s.type === "recent" || s.type === "trending");
  }

  // Filter suggestions based on query
  return mockSearchSuggestions.filter((suggestion) => suggestion.query.toLowerCase().includes(query.toLowerCase()));
};
