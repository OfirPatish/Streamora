import { Card, CardContent } from "@/components/ui/card";
import { getTMDBImageUrl } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { FeaturedCardProps } from "../types";

export function FeaturedCard({
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
  description,
}: FeaturedCardProps) {
  const href = type === "movie" ? `/movies/${id}` : `/series/${id}`;
  const posterUrl = getTMDBImageUrl(posterPath || null, "poster", "large");

  return (
    <div className="w-full">
      <Link href={href} className="block">
        <Card className="cursor-pointer w-full relative overflow-hidden bg-transparent border-transparent p-0">
          <CardContent className="p-0 w-full relative">
            {/* Poster Container - Border on Hover */}
            <div className="relative w-full aspect-[2/3] overflow-hidden rounded-lg border-2 border-transparent hover:border-primary/60 hover:shadow-lg transition-all duration-300">
              {posterPath && posterUrl ? (
                <Image
                  src={posterUrl}
                  alt={title}
                  fill
                  priority={priority}
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center rounded-lg">
                  <div className="text-muted-foreground text-center">
                    <div className="text-4xl mb-2">🎬</div>
                    <div className="text-sm">No Image</div>
                  </div>
                </div>
              )}
            </div>

            {/* Title Only - Centered */}
            <div className="mt-2 text-center">
              <h3 className="text-sm font-semibold line-clamp-2 leading-tight text-foreground">
                {title}
              </h3>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
