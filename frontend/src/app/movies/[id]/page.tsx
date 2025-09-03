import { MovieDetail } from "@/features/movies";
import { ContentService } from "@/services";

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

  const movieData = await ContentService.getMovieDetails(id);

  return <MovieDetail id={id} data={movieData.data} loading={false} error={movieData.error || null} />;
}
