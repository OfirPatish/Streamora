Prompt for Cursor AI

I have a Next.js + TypeScript project, and I want to refactor my folder structure for better scalability, maintainability, and cleaner imports.
Here are my goals and requirements:

Current Situation

My project has mixed organization: some files are grouped by feature and others by type.

Hooks, components, and API logic are spread across multiple unrelated folders.

Imports are getting messy and hard to manage.

I want a clear, consistent, and scalable architecture.

Refactor Goals

1. Switch to a Feature-Based Structure

Group files by feature/domain instead of mixing them by type.

Example refactor plan:

src/
├── app/ # Next.js app routes
│ ├── movies/
│ ├── series/
│ ├── search/
│ ├── layout.tsx
│ └── globals.css
│
├── features/ # NEW → Group features together
│ ├── home/
│ │ ├── components/
│ │ │ ├── FeaturedCard.tsx
│ │ │ ├── FeaturedCarousel.tsx
│ │ │ └── HomeCarousels.tsx
│ │ ├── hooks/
│ │ ├── types/
│ │ └── index.ts
│ │
│ ├── movies/
│ │ ├── components/
│ │ │ └── MovieDetail.tsx
│ │ ├── hooks/
│ │ ├── types/
│ │ └── index.ts
│ │
│ ├── search/
│ │ ├── components/
│ │ │ ├── SearchDropdown.tsx
│ │ │ ├── SearchFilters.tsx
│ │ │ └── SearchResultsList.tsx
│ │ ├── hooks/
│ │ └── index.ts
│
├── components/ # **Truly global UI components**
│ ├── layout/
│ │ ├── DesktopHeader.tsx
│ │ ├── MobileHeader.tsx
│ │ ├── MobileBottomNav.tsx
│ │ └── PageTemplate.tsx
│ ├── shared/
│ │ ├── ContentCard.tsx
│ │ ├── ContentDisplay.tsx
│ │ ├── PaginatedContent.tsx
│ │ └── VideoModal.tsx
│ └── ui/ # Design system primitives (atomic)
│ ├── Button.tsx
│ ├── Input.tsx
│ └── Modal.tsx
│
├── hooks/ # Only **generic** reusable hooks
│ ├── useInfiniteScroll.ts
│ ├── useMobile.ts
│ ├── useSplitScreen.ts
│ └── ...
│
├── lib/ # API clients, caching, utilities
│ ├── api.ts
│ ├── query-client.ts
│ ├── constants.ts
│ ├── cache.ts
│ └── utils.ts
│
├── providers/ # Context providers
│ └── QueryProvider.tsx
│
└── types/ # Global TypeScript types

2. Move Feature-Specific Hooks

Hooks like useDetailQueries.ts, useHeroQueries.ts, useHomeQueries.ts, etc. → move into their respective features/ folders.

Keep only generic reusable hooks in src/hooks/.

3. Simplify Imports with Barrel Files

Add index.ts in each folder:

export { default as FeaturedCard } from "./FeaturedCard";
export { default as FeaturedCarousel } from "./FeaturedCarousel";

Then import like this:

import { FeaturedCard, FeaturedCarousel } from "@/features/home";

4. Separate UI Design System

Keep atomic UI primitives (e.g., Button, Input, Modal) inside src/components/ui/.

These must not depend on any app or feature logic.

5. TypeScript Best Practices

Move feature-specific types into their features/\*/types/ folders.

Keep global types inside src/types/.

Expected Output from Cursor

Suggest a step-by-step refactor plan.

Update file locations.

Auto-update import paths to avoid breaking the app.

Create missing index.ts barrel files where needed.

Ensure that tsconfig.json paths are updated if necessary.
