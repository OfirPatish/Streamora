import { Star, Calendar, Clock, Play, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FeaturedContent } from "@/types/content";

interface HeroInfoProps {
  content: FeaturedContent;
}

export function HeroInfo({ content }: HeroInfoProps) {
  const href = content.type === "movie" ? `/movies/${content.id}` : `/series/${content.id}`;

  return (
    <div className="space-y-6">
      {/* Badges */}
      <div className="flex gap-2 flex-wrap">
        {content.isTrending && (
          <Badge className="bg-primary hover:bg-primary text-primary-foreground">🔥 Trending</Badge>
        )}
        {content.isNew && <Badge className="bg-primary hover:bg-primary text-primary-foreground">✨ New</Badge>}
        <Badge variant="outline" className="border-border text-muted-foreground">
          {content.type === "movie" ? "🎬 Movie" : "📺 Series"}
        </Badge>
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
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

      {/* Genres */}
      <div className="flex gap-2">
        {content.genre.map((genre) => (
          <span key={genre} className="text-xs px-2 py-1 bg-muted/50 rounded-full text-muted-foreground">
            {genre}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
          <a href={href}>
            <Play className="mr-2 h-5 w-5" />
            Watch Now
          </a>
        </Button>
        <Button variant="outline" size="lg" className="border-border text-foreground hover:bg-muted">
          <Plus className="mr-2 h-5 w-5" />
          Add to List
        </Button>
      </div>
    </div>
  );
}
