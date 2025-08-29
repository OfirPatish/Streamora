import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { MoviesContent } from "@/components/movies/MoviesContent";

export default function MoviesPage() {
  return (
    <div className="min-h-screen w-full bg-background">
      <DesktopHeader />
      <MobileHeader />

      <main className="pb-20 lg:pb-0">
        <MoviesContent />
      </main>

      <MobileBottomNav />
    </div>
  );
}
