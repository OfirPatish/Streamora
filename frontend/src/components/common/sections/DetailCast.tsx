import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getTMDBImageUrl } from "@/lib/api";

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

export function DetailCast({ cast, title = "Cast", maxItems = 8 }: DetailCastProps) {
  if (!cast || cast.length === 0) {
    return null;
  }

  const displayCast = cast.sort((a, b) => (a.order || 0) - (b.order || 0)).slice(0, maxItems);

  return (
    <section className="bg-muted/50 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
              <div className="relative mb-3">
                <Avatar className="w-16 h-16 mx-auto group-hover:scale-105 transition-transform duration-200">
                  <AvatarImage src={profileUrl || undefined} alt={member.name} className="object-cover" />
                  <AvatarFallback className="bg-muted text-muted-foreground text-sm font-medium">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                  {member.name}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2">{member.character}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
