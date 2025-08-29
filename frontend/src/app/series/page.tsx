import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SeriesContent } from "@/components/series/SeriesContent";

export default function SeriesPage() {
  return (
    <div className="min-h-screen w-full bg-background">
      <DesktopHeader />
      <MobileHeader />

      <main className="pb-20 lg:pb-0">
        <SeriesContent />
      </main>

      <MobileBottomNav />
    </div>
  );
}
