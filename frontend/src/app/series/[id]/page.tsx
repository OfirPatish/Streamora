import { DesktopHeader, MobileHeader, MobileBottomNav } from "@/components/layout";
import { SeriesDetail } from "@/components/features/series";

interface SeriesPageProps {
  params: {
    id: string;
  };
}

export default function SeriesPage({ params }: SeriesPageProps) {
  return (
    <div className="min-h-screen w-full">
      <DesktopHeader />
      <MobileHeader />

      <main className="pb-20 lg:pb-0 p-6">
        <SeriesDetail id={params.id} />
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
