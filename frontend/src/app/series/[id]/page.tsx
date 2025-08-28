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
    <div className="flex min-h-screen w-full">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <SeriesDetail id={params.id} />
        </main>
      </div>
    </div>
  );
}
