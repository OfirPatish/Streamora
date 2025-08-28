import { Button } from "@/components/ui/button";
import { Play, Info, Plus } from "lucide-react";
import Link from "next/link";

interface HeroActionsProps {
  href: string;
}

export function HeroActions({ href }: HeroActionsProps) {
  return (
    <div className="flex gap-4 pt-4">
      <Button size="lg" className="bg-white text-black hover:bg-gray-200 gap-2 px-8">
        <Play className="h-5 w-5" />
        Watch Trailer
      </Button>
      <Link href={href}>
        <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 gap-2 px-6">
          <Info className="h-5 w-5" />
          More Info
        </Button>
      </Link>
      <Button size="lg" variant="ghost" className="text-white hover:bg-gray-800 gap-2">
        <Plus className="h-5 w-5" />
        Add to Watchlist
      </Button>
    </div>
  );
}
