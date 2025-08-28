import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  title?: string;
  description?: string;
  badgeText?: string;
}

export function HeroSection({ 
  title = "Featured Movie Title",
  description = "Experience the latest blockbuster with stunning visuals and an incredible storyline that will keep you on the edge of your seat.",
  badgeText = "Featured"
}: HeroSectionProps) {
  return (
    <section className="mb-8">
      <div className="relative h-96 rounded-lg overflow-hidden border w-full">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 p-8">
          <Badge variant="secondary" className="mb-4">
            {badgeText}
          </Badge>
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <p className="mb-4 max-w-md">{description}</p>
          <div className="flex space-x-4">
            <Button size="lg">
              <Play className="h-4 w-4 mr-2" />
              Watch Now
            </Button>
            <Button variant="outline" size="lg">
              <Info className="h-4 w-4 mr-2" />
              More Info
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Icons for the buttons
const Play = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
      clipRule="evenodd"
    />
  </svg>
);

const Info = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  </svg>
);
