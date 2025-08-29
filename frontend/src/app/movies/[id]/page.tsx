import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { MovieDetail } from "@/components/movies/MovieDetail";

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  let id: string;
  try {
    const resolvedParams = await params;
    id = resolvedParams.id;
  } catch (error) {
    throw new Error("Failed to resolve movie ID");
  }

  return (
    <div className="min-h-screen w-full">
      <DesktopHeader />
      <MobileHeader />

      <main className="pb-20 lg:pb-0 p-6">
        <MovieDetail id={id} />
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
