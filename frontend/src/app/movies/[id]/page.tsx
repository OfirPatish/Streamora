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
    <div className="flex min-h-screen w-full">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <MovieDetail id={params.id} />
        </main>
      </div>
    </div>
  );
}
