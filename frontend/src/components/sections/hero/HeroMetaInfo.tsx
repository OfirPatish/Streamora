import { Star, Calendar, Clock } from "lucide-react";
import { FeaturedContent } from "./types";

interface HeroMetaInfoProps {
  content: FeaturedContent;
}

export function HeroMetaInfo({ content }: HeroMetaInfoProps) {
  return (
    <div className="flex items-center gap-4 text-sm text-gray-300">
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{content.rating}</span>
      </div>
      <div className="flex items-center gap-1">
        <Calendar className="h-4 w-4" />
        <span>{content.year}</span>
      </div>
      <div className="flex items-center gap-1">
        <Clock className="h-4 w-4" />
        <span>{content.runtime}</span>
      </div>
    </div>
  );
}
