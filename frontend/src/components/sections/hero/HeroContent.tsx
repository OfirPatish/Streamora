import { Typography } from "@/components/ui/typography";
import { FeaturedContent } from "./types";
import { HeroBadges } from "./HeroBadges";
import { HeroMetaInfo } from "./HeroMetaInfo";
import { HeroGenres } from "./HeroGenres";
import { HeroActions } from "./HeroActions";

interface HeroContentProps {
  content: FeaturedContent;
}

export function HeroContent({ content }: HeroContentProps) {
  const href = content.type === "movie" ? `/movies/${content.id}` : `/series/${content.id}`;

  return (
    <div className="relative z-20 h-full flex items-center">
      <div className="max-w-2xl pl-12 pr-8 space-y-6">
        {/* Badges */}
        <HeroBadges content={content} />

        {/* Title */}
        <div className="space-y-2">
          <Typography variant="heroTitle" className="text-white leading-tight">
            {content.title}
          </Typography>

          {/* Meta Info */}
          <HeroMetaInfo content={content} />

          {/* Genres */}
          <HeroGenres genres={content.genre} />
        </div>

        {/* Description */}
        <Typography variant="lead" className="text-gray-200 leading-relaxed max-w-xl">
          {content.description}
        </Typography>

        {/* Action Buttons */}
        <HeroActions href={href} />
      </div>
    </div>
  );
}
