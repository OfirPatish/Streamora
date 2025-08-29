import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SeriesDetail } from "@/components/series/SeriesDetail";

interface SeriesPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  let id: string;
  try {
    const resolvedParams = await params;
    id = resolvedParams.id;
  } catch (error) {
    throw new Error("Failed to resolve series ID");
  }
  return (
    <div className="min-h-screen w-full bg-background">
      <DesktopHeader />
      <MobileHeader />

      <main className="pb-20 lg:pb-0">
        <SeriesDetail id={id} />
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
