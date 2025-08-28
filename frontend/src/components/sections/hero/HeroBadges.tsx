import { Badge } from "@/components/ui/badge";
import { FeaturedContent } from "./types";

interface HeroBadgesProps {
  content: FeaturedContent;
}

export function HeroBadges({ content }: HeroBadgesProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {content.isTrending && <Badge className="bg-red-600 hover:bg-red-600 text-white">🔥 Trending</Badge>}
      {content.isNew && <Badge className="bg-blue-600 hover:bg-blue-600 text-white">✨ New</Badge>}
      <Badge variant="outline" className="border-gray-600 text-gray-300">
        {content.type === "movie" ? "🎬 Movie" : "📺 Series"}
      </Badge>
    </div>
  );
}
