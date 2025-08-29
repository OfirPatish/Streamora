import { Typography } from "@/components/ui/typography";
import { FeaturedContent } from "@/types/content";
import { HeroInfo } from "./HeroInfo";

interface HeroContentProps {
  content: FeaturedContent;
}

export function HeroContent({ content }: HeroContentProps) {
  return (
    <div className="relative z-20 h-full flex items-center">
      <div className="max-w-2xl pl-12 pr-8 space-y-6">
        {/* Title */}
        <Typography variant="heroTitle" className="text-foreground leading-tight">
          {content.title}
        </Typography>

        {/* Info (Badges, Meta, Genres, Actions) */}
        <HeroInfo content={content} />

        {/* Description */}
        <Typography variant="lead" className="text-muted-foreground leading-relaxed max-w-xl">
          {content.description}
        </Typography>
      </div>
    </div>
  );
}
