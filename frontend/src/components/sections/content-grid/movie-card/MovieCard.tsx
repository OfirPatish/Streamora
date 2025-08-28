import { Film, Tv } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface MovieCardProps {
  id: number;
  title: string;
  year: string;
  genre: string;
  type: "movie" | "series";
  index: number;
}

export function MovieCard({ id, title, year, genre, type, index }: MovieCardProps) {
  const Icon = type === "movie" ? Film : Tv;
  const href = type === "movie" ? `/movies/${id}` : `/series/${id}`;

  return (
    <Link href={href}>
      <Card className="cursor-pointer hover:scale-105 transition-transform">
        <CardContent className="p-0">
          <div className="aspect-[2/3] border rounded-t-lg flex items-center justify-center">
            <Icon className="h-8 w-8" />
          </div>
          <div className="p-3">
            <h3 className="font-medium text-sm mb-1">
              {title} {index + 1}
            </h3>
            <p className="text-xs text-muted-foreground">
              {year} • {genre}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
