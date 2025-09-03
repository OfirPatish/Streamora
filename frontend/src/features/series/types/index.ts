// ============================================================================
// SERIES FEATURE TYPES - BARREL EXPORTS
// ============================================================================

// Series data types
export * from "./series";

// Union type for all series feature types
export type SeriesFeatureTypes =
  | import("./series").Series
  | import("./series").SeriesDetail
  | import("./series").Episode
  | import("./series").Season
  | import("./series").Network
  | import("./series").Genre
  | import("./series").ProductionCompany
  | import("./series").ProductionCountry
  | import("./series").SpokenLanguage;
