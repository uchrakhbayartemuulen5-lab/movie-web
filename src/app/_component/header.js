"use client";
import { DownIcon } from "./icon/dowIcon";
import { SearchIcon } from "./icon/searchIcon";
import { MoonIcon } from "./icon/moonicon";
import { Line } from "./icon/line";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { StarIcon } from "./icon/phone";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const Header = () => {
  const router = useRouter();

  const [genreModal, setGenreModal] = useState(false);
  const [genres, setGenres] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
      .then((res) => res.json())
      .then((data) => setGenres(data.genres || []));
  }, []);

  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      setSearchLoading(true);
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          searchValue,
        )}&language=en-US&page=1`,
        options,
      )
        .then((res) => res.json())
        .then((data) => {
          setSearchResults((data.results || []).slice(0, 5));
          setSearchLoading(false);
        })
        .catch(() => setSearchLoading(false));
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  const handleGenreClick = (id) => {
    router.push(`/GenreMovies?genre=${id}`);
    setGenreModal(false);
  };

  return (
    <header className="w-full bg-gray-50">
      <div className="relative flex flex-wrap items-center justify-between gap-4 px-4 sm:px-6 py-4">
        {/* Logo */}
        <img
          src="/Logo.png"
          className="h-5 w-auto sm:h-6 cursor-pointer shrink-0"
          alt="Logo"
          onClick={() => router.push("/")}
        />

        {/* Center controls */}
        <div className="relative w-full sm:w-auto">
          <div className="flex flex-wrap items-center gap-3">
            {/* Genre button */}
            <button
              onClick={() => setGenreModal((v) => !v)}
              className="border h-9 px-3 rounded-lg bg-white flex gap-2 items-center cursor-pointer shrink-0"
            >
              <DownIcon /> Genre
            </button>

            {/* Search */}
            <div className="relative flex-1 min-w-[220px]">
              <div className="border px-3 rounded-lg flex items-center gap-2 bg-white w-full">
                <SearchIcon />
                <input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search movies..."
                  className="w-full outline-none h-9 text-sm sm:text-base"
                />
              </div>

              {/* Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-full sm:w-[520px] bg-white border rounded-lg shadow z-50">
                  {searchLoading ? (
                    <p className="p-3 text-gray-500">Loading...</p>
                  ) : (
                    <>
                      {searchResults.map((movie) => (
                        <div key={movie.id}>
                          <div
                            className="flex gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                            onClick={() =>
                              router.push(`/movie-detail/${movie.id}`)
                            }
                          >
                            {movie.poster_path ? (
                              <img
                                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                className="w-14 h-20 sm:w-[67px] sm:h-[100px] rounded object-cover"
                                alt={movie.title}
                              />
                            ) : (
                              <div className="w-14 h-20 sm:w-[67px] sm:h-[100px] bg-gray-300 flex items-center justify-center text-xs rounded">
                                No Image
                              </div>
                            )}

                            <div className="min-w-0">
                              <p className="font-semibold text-sm sm:text-base truncate">
                                {movie.title}
                              </p>
                              <p className="flex items-center gap-1 text-xs sm:text-sm">
                                <StarIcon />
                                {movie.vote_average?.toFixed?.(1) ?? "—"} / 10
                              </p>
                              <p className="pt-2 text-xs sm:text-sm text-gray-600">
                                {movie.release_date?.slice(0, 4) || "—"}
                              </p>
                            </div>
                          </div>
                          <div className="h-px bg-gray-200" />
                        </div>
                      ))}

                      <button
                        onClick={() => {
                          router.push(
                            `/search?query=${encodeURIComponent(searchValue)}`,
                          );
                          setSearchResults([]);
                        }}
                        className="w-full text-left sm:text-center py-3 px-3 font-medium text-sm text-[#09090B] hover:underline cursor-pointer"
                      >
                        See all results for “{searchValue}”
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Genre modal */}
          {genreModal && (
            <div className="absolute mt-2 left-0 bg-white border p-4 z-50 w-[min(92vw,520px)] rounded-lg shadow">
              <p className="text-lg sm:text-xl font-semibold">Genres</p>
              <p className="text-xs sm:text-sm text-gray-500">
                See lists of movies by genre
              </p>
              <div className="my-3">
                <Line />
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {genres.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => handleGenreClick(g.id)}
                    className="border px-3 py-1 rounded-2xl hover:bg-gray-100 cursor-pointer text-xs sm:text-sm"
                  >
                    {g.name} ▶
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: theme button */}
        <button className="border rounded-2xl w-10 h-10 flex items-center justify-center shrink-0">
          <MoonIcon />
        </button>
      </div>
    </header>
  );
};
