"use client";

import { getTMDBImageUrl } from "@/lib/api";
import { CastMember, MovieCastListProps } from "../types";

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function MovieCastList({ cast, maxItems = 12 }: MovieCastListProps) {
  const displayCast = cast.slice(0, maxItems);

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
      {displayCast.map((member) => (
        <div
          key={member.id}
          className="flex flex-col items-center min-w-[80px] text-center"
        >
          {/* Profile Picture */}
          <div className="w-16 h-16 rounded-full overflow-hidden mb-2 border-2 border-border/50 hover:border-primary/50 transition-colors">
            {member.profile_path ? (
              <img
                src={getTMDBImageUrl(member.profile_path, "profile", "small")}
                alt={member.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to initials if image fails to load
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    const fallback = document.createElement("div");
                    fallback.className =
                      "w-full h-full bg-primary/20 flex items-center justify-center";
                    fallback.innerHTML = `<span class="text-sm font-semibold text-primary">${member.name.charAt(
                      0
                    )}</span>`;
                    parent.appendChild(fallback);
                  }
                }}
              />
            ) : (
              <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                  {member.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Name */}
          <p className="text-xs font-medium text-foreground line-clamp-2 leading-tight">
            {member.name}
          </p>

          {/* Character (if available) */}
          {member.character && (
            <p className="text-xs text-muted-foreground line-clamp-1 leading-tight mt-1">
              {member.character}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
