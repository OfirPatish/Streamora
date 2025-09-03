// ============================================================================
// COMPONENT PROPS - All component prop interfaces for browse feature
// ============================================================================

import { DisplayContentItem } from "./content";

// BrowseCarousel component props
export interface BrowseCarouselProps {
  title: string;
  items: DisplayContentItem[];
  loading?: boolean;
  error?: string | null;
  showBadge?: boolean;
  badgeText?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
}

// HeroBanner component props
export interface HeroBannerProps {
  featuredContent: DisplayContentItem[];
}
