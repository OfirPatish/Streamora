import React from "react";
import { cn } from "@/lib/utils";

type HTMLElementType = keyof React.JSX.IntrinsicElements;

// Polymorphic component types
type PolymorphicAsProp<C extends React.ElementType> = {
  as?: C;
};

type PolymorphicProps<C extends React.ElementType> = React.PropsWithChildren<
  { variant?: keyof typeof typographyVariants } & PolymorphicAsProp<C>
> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof PolymorphicAsProp<C> | "variant">;

// Typography component variants
const typographyVariants = {
  // Headings
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  h5: "scroll-m-20 text-lg font-semibold tracking-tight",
  h6: "scroll-m-20 text-base font-semibold tracking-tight",

  // Body text
  body: "leading-7 [&:not(:first-child)]:mt-6",
  bodyLarge: "text-lg leading-7 [&:not(:first-child)]:mt-6",
  bodySmall: "text-sm leading-6 [&:not(:first-child)]:mt-4",

  // Special text
  lead: "text-xl text-muted-foreground",
  large: "text-lg font-semibold",
  small: "text-sm font-medium leading-none",
  muted: "text-sm text-muted-foreground",

  // Streaming-specific
  heroTitle:
    "text-5xl lg:text-7xl font-black tracking-tight text-foreground",
  cardTitle: "text-sm font-medium leading-tight line-clamp-2",
  cardSubtitle: "text-xs text-muted-foreground line-clamp-1",
  sectionTitle: "text-2xl font-bold mb-6",
  badge: "text-xs font-semibold uppercase tracking-wide",

  // Interactive elements
  button: "text-sm font-medium",
  link: "text-sm font-medium underline underline-offset-4 hover:no-underline",

  // Status and metadata
  rating: "text-sm font-bold tabular-nums",
  year: "text-sm text-muted-foreground tabular-nums",
  runtime: "text-sm text-muted-foreground tabular-nums",
  genre: "text-xs text-muted-foreground uppercase tracking-wide",
} as const;

// Updated Typography component with polymorphic typing
export function Typography<C extends React.ElementType = "p">({
  variant = "body",
  as,
  className,
  children,
  ...props
}: PolymorphicProps<C>) {
  // Determine the HTML element to render
  const Component = (as || getDefaultElement(variant)) as React.ElementType;

  return (
    <Component className={cn(typographyVariants[variant], className)} {...props}>
      {children}
    </Component>
  );
}

// Helper function to determine default HTML element based on variant
function getDefaultElement(variant: keyof typeof typographyVariants): HTMLElementType {
  // Check for actual HTML heading elements (h1-h6)
  if (/^h[1-6]$/.test(variant)) return variant as HTMLElementType;

  switch (variant) {
    case "heroTitle":
      return "h1"; // Main page title
    case "sectionTitle":
      return "h2"; // Better semantic hierarchy
    case "cardTitle":
      return "h3"; // Card titles are subsections
    case "lead":
    case "large":
    case "body":
    case "bodyLarge":
    case "bodySmall":
      return "p";
    case "small":
    case "muted":
    case "cardSubtitle":
    case "badge":
    case "rating":
    case "year":
    case "runtime":
    case "genre":
      return "span";
    case "link":
      return "a";
    default:
      return "p";
  }
}

// Utility components for common use cases (simplified)
export function HeroTitle({
  className,
  children,
  as,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Typography variant="heroTitle" as={as} className={className} {...props}>
      {children}
    </Typography>
  );
}

export function SectionTitle({
  className,
  children,
  as,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Typography variant="sectionTitle" as={as} className={className} {...props}>
      {children}
    </Typography>
  );
}

export function CardTitle({
  className,
  children,
  as,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Typography variant="cardTitle" as={as} className={className} {...props}>
      {children}
    </Typography>
  );
}

export function CardSubtitle({
  className,
  children,
  as,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Typography variant="cardSubtitle" as={as} className={className} {...props}>
      {children}
    </Typography>
  );
}
