import { Film, Tv } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getTMDBImageUrl } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

interface ContentCardProps {
  id: number;
  title: string;
  year: string;
  genre: string;
  type: "movie" | "series";
  index: number;
  rating?: number;
  isNew?: boolean;
  posterPath?: string | null;
  priority?: boolean;
}

export function ContentCard({
  id,
  title,
  year,
  genre,
  type,
  index,
  rating,
  isNew,
  posterPath,
  priority = false,
}: ContentCardProps) {
  const Icon = type === "movie" ? Film : Tv;
  const href = type === "movie" ? `/movies/${id}` : `/series/${id}`;
  const posterUrl = getTMDBImageUrl(posterPath || null, "poster", "medium");

  return (
    <div className="w-full group">
      <Link href={href} className="block" suppressHydrationWarning>
        <Card className="cursor-pointer transition-all duration-300 w-full relative overflow-hidden bg-transparent border-transparent p-0">
          <CardContent className="p-0 w-full relative">
            {/* Poster/Thumbnail - Border on Hover */}
            <div className="poster-aspect flex items-center justify-center w-full bg-muted transition-all duration-300 relative overflow-hidden rounded-lg border-2 border-transparent hover:border-primary/60 hover:shadow-lg">
              {posterPath && posterUrl ? (
                <Image
                  src={posterUrl}
                  alt={title}
                  fill
                  priority={priority}
                  className="object-cover rounded-lg"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                />
              ) : (
                <Icon className="h-12 w-12 text-muted-foreground" />
              )}
            </div>

            {/* Title - Centered */}
            <div className="mt-2">
              <h3 className="text-sm font-semibold text-center line-clamp-2 leading-tight px-1 text-foreground">
                {title}
              </h3>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
