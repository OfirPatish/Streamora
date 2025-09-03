// ============================================================================
// MOVIE FEATURE TYPES - BARREL EXPORTS
// ============================================================================

// Movie data types
export * from "./movie";

// Union type for all movie feature types
export type MovieFeatureTypes =
  | import("./movie").Movie
  | import("./movie").MovieDetail
  | import("./movie").Genre
  | import("./movie").ProductionCompany
  | import("./movie").ProductionCountry
  | import("./movie").SpokenLanguage
  | import("./movie").Collection;
