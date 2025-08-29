import { DesktopHeader, MobileHeader, MobileBottomNav } from "@/components/layout";
import { MovieDetail } from "@/components/features/movies";

interface MoviePageProps {
  params: {
    id: string;
  };
}

export default function MoviePage({ params }: MoviePageProps) {
  return (
    <div className="min-h-screen w-full">
      <DesktopHeader />
      <MobileHeader />

      <main className="pb-20 lg:pb-0 p-6">
        <MovieDetail id={params.id} />
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
