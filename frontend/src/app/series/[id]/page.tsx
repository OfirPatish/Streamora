import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { SeriesDetail } from "@/components/sections/detail/SeriesDetail";

interface SeriesPageProps {
  params: {
    id: string;
  };
}

export default function SeriesPage({ params }: SeriesPageProps) {
  return (
    <div className="min-h-screen w-full">
      <Header />

      <div className="flex w-full">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 w-full">
          <SeriesDetail id={params.id} />
        </main>
      </div>
    </div>
  );
}
