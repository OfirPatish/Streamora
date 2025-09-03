// ============================================================================
// BROWSE FEATURE TYPES - BARREL EXPORTS
// ============================================================================

// Core browse types (API data models)
export * from "./browse";

// Content display types (UI components)
export * from "./content";

// Layout types (page structure)
export * from "./layout";

// Union type for all browse feature types
export type BrowseFeatureTypes =
  | import("./browse").Movie
  | import("./browse").Series
  | import("./browse").UseBrowseContentProps
  | import("./content").MediaCardProps
  | import("./content").ContentItem
  | import("./content").DisplayProps
  | import("./layout").GridProps
  | import("./layout").BannerProps;
