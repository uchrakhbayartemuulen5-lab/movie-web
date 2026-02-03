"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "../_component/Header";
import { useRouter } from "next/navigation";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export default function GenreMovies() {
  const searchParams = useSearchParams();
  const genreId = searchParams.get("genre");
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [currentGenreName, setCurrentGenreName] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [genres, setGenres] = useState([]);
  const handleGenreClick = (genreId) => {
    setPage(1);
    router.push(`/GenreMovies?genre=${genreId}`);
  };
  useEffect(() => {
    if (!genreId || genres.length === 0) return;

    const currentGenre = genres.find((g) => String(g.id) === String(genreId));

    setCurrentGenreName(currentGenre?.name || "");
  }, [genreId, genres]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
      .then((res) => res.json())
      .then((data) => setGenres(data.genres || []));
  }, []);

  useEffect(() => {
    if (!genreId) return;

    setLoading(true);

    fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&page=${page}`,
      options,
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
        setTotalResults(data.total_results || 0);
        setTotalPages(data.total_pages || 1);
        setLoading(false);
      });
  }, [genreId, page]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="p-[60px] flex flex-col gap-[32px]">
        <p className="text-[30px] font-semibold text-black">Search filter</p>
        <div className="flex justify-center gap-10">
          <div className=" mt-2 bg-white  w-[387px]">
            <p className="text-[24px] font-semibold">Genres</p>
            <div className="pt-2">
              <p className="text-[16px] font-normal">
                See lists of movies by genre
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-3">
              {genres.map((g) => (
                <button
                  key={g.id}
                  onClick={() => handleGenreClick(g.id)}
                  className="border px-3 py-1 rounded-2xl hover:bg-gray-100 cursor-pointer"
                >
                  {g.name} ▶
                </button>
              ))}
            </div>
          </div>
          <div className="bg-gray-400 w-1 min-h-screen "></div>
          <div>
            {!loading && (
              <div className="px-6 pb-4">
                <p className="text-[24px] font-semibold text-black">
                  {totalResults.toLocaleString()} titles in "{currentGenreName}"
                </p>
              </div>
            )}

            {loading ? (
              <p className="p-6">Loading...</p>
            ) : (
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 bg-white">
                {movies.map((movie) => (
                  <div
                    key={movie.id}
                    className="border rounded-lg p-2 bg-gray-100 cursor-pointer"
                    onClick={() => router.push(`/movie-detail/${genreId}`)}
                  >
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                          : "/no-image.png"
                      }
                      alt={movie.title}
                      className="rounded-md"
                    />
                    <p className="mt-2 text-center font-semibold">
                      {movie.title}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {!loading && movies.length > 0 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-4 py-2 border rounded disabled:opacity-40 text-black"
                >
                  ◀︎ Previous
                </button>

                <span className="text-[16px] font-medium">
                  Page {page} of {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-4 py-2 border rounded disabled:opacity-40 text-black"
                >
                  Next ▶︎
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
