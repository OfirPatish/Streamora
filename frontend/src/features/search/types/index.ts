// ============================================================================
// SEARCH FEATURE TYPES - BARREL EXPORTS
// ============================================================================

// Search data types
export * from "./search";

// Union type for all search feature types
export type SearchFeatureTypes =
  | import("./search").SearchResult
  | import("./search").SearchFilters
  | import("./search").SearchState
  | import("./search").SearchDropdownProps;
