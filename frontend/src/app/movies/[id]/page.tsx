import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { MovieDetail } from "@/components/sections/detail/MovieDetail";

interface MoviePageProps {
  params: {
    id: string;
  };
}

export default function MoviePage({ params }: MoviePageProps) {
  return (
    <div className="min-h-screen w-full">
      <Header />

      <div className="flex w-full">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 w-full">
          <MovieDetail id={params.id} />
        </main>
      </div>
    </div>
  );
}
