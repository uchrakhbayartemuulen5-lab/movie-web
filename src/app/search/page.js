"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Header } from "../_component/Header";
import { Blue } from "../_component/Blue";
import { StarIcon } from "../_component/icon/phone";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export default function SearchPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
}

function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const router = useRouter();

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
      .then((res) => res.json())
      .then((data) => setGenres(data.genres || []));
  }, []);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}&language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
        setTotalResults(data.total_results || 0);
        setTotalPages(data.total_pages || 1);
        setLoading(false);
      });
  }, [query, page]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="p-[60px] flex flex-col gap-[32px]">
        <p className="text-[30px] font-semibold text-black">Search results</p>

        <div className="flex justify-center gap-10">
          <div className="flex-1">
            {!loading && (
              <p className="text-[24px] font-semibold mb-4">
                {totalResults.toLocaleString()} results for “{query}”
              </p>
            )}

            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movies.map((movie) => (
                  <div
                    key={movie.id}
                    className=" rounded-lg  cursor-pointer"
                    onClick={() => router.push(`/movie-detail/${movie.id}`)}
                  >
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                          : "/no.jpg"
                      }
                      className="rounded-t-lg w-[165px] h-[244px]"
                    />
                    <div className="w-[165px] h-[87px] bg-[#F4F4F5] rounded-b-lg">
                      <p className="flex items-center  text-center  gap-1 text-sm">
                        <StarIcon />
                        {movie.vote_average.toFixed(1)} / 10
                      </p>
                      <p className="mt-2  font-semibold">{movie.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && movies.length > 0 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-4 py-2 border rounded disabled:opacity-40"
                >
                  ◀︎ Previous
                </button>

                <span>
                  Page {page} of {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-4 py-2 border rounded disabled:opacity-40"
                >
                  Next ▶︎
                </button>
              </div>
            )}
          </div>

          <div className="bg-gray-300 w-[2px] min-h-screen" />

          <div className="w-[387px]">
            <p className="text-[24px] font-semibold">Search for genre</p>
            <p className="text-[16px] text-gray-600 pt-2">
              See lists of movies by genre
            </p>

            <div className="flex flex-wrap gap-3 mt-4">
              {genres.map((g) => (
                <button
                  key={g.id}
                  onClick={() => router.push(`/GenreMovies?genre=${g.id}`)}
                  className="border px-3 py-1 rounded-2xl hover:bg-gray-100 cursor-pointer"
                >
                  {g.name} ▶
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Blue />
    </div>
  );
}
