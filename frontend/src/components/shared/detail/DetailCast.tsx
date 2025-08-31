"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import { getTMDBImageUrl } from "@/lib/api";

// ============================================================================
// INTERFACES
// ============================================================================

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string | null;
  order?: number;
}

interface DetailCastProps {
  cast?: CastMember[];
  title?: string;
  maxItems?: number;
}

// ============================================================================
// DETAIL CAST COMPONENT
// ============================================================================

export function DetailCast({ cast, title = "Cast", maxItems = 12 }: DetailCastProps) {
  if (!cast || cast.length === 0) {
    return null;
  }

  const displayCast = cast.sort((a, b) => (a.order || 0) - (b.order || 0)).slice(0, maxItems);

  return (
    <section className="bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl p-8 border border-border/50">
      <div className="flex items-center gap-3 mb-8">
        <Users className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
        {displayCast.map((member, index) => {
          const profileUrl = member.profile_path ? getTMDBImageUrl(member.profile_path, "profile", "medium") : null;

          const initials = member.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return (
            <div key={`${member.id}-${member.name}-${index}`} className="text-center group">
              <div className="relative mb-4">
                <Avatar className="w-20 h-20 mx-auto shadow-lg">
                  <AvatarImage src={profileUrl || undefined} alt={member.name} className="object-cover" />
                  <AvatarFallback className="bg-gradient-to-br from-muted to-muted/50 text-muted-foreground text-lg font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {member.name}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{member.character}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
