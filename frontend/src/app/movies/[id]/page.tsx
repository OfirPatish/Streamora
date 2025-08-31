import { MovieDetail } from "@/features/movies";
import { MovieDetails } from "@/types/api";

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}

// Server-side data fetching
async function getMovieDetails(id: string) {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/movies/${id}`;
    const response = await fetch(apiUrl, {
      next: { revalidate: 60 * 60 * 24 }, // 24 hours - movie details change very slowly
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid response format");
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error("API returned error");
    }

    return {
      data: result.data as MovieDetails,
      loading: false,
      error: null,
    };
  } catch (error) {
    console.error("Failed to fetch movie details:", error);
    return {
      data: null,
      loading: false,
      error: "Failed to load movie details",
    };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  let id: string;
  try {
    const resolvedParams = await params;
    id = resolvedParams.id;
  } catch (error) {
    throw new Error("Failed to resolve movie ID");
  }

  const movieData = await getMovieDetails(id);

  return <MovieDetail id={id} data={movieData.data} loading={movieData.loading} error={movieData.error} />;
}
