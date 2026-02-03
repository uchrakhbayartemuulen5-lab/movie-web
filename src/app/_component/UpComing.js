"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SeeMoreIcon } from "./icon/seemoreicon";

const apilink =
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const UpComing = () => {
  const [upComingData, setUpComingData] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const getData = async () => {
    setLoading(true);
    try {
      const data = await fetch(apilink, options);
      const jsonData = await data.json();
      setUpComingData(jsonData.results || []);
    } catch (err) {
      console.error("Error fetching upcoming movies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleMovieClick = (movieID) => {
    router.push(`/movie-detail/${movieID}`);
  };

  if (loading) return <div>...loading</div>;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12">
        <h1 className="mt-6 sm:mt-10 text-2xl sm:text-3xl font-semibold">
          UpComing
        </h1>

        <Link
          href="/upcoming"
          className="sm:mt-10 text-sm sm:text-base flex items-center gap-2"
        >
          See More
          <SeeMoreIcon />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 mb-10">
        {upComingData.slice(0, 10).map((movie) => (
          <div
            key={movie.id}
            className="cursor-pointer"
            onClick={() => handleMovieClick(movie.id)}
          >
            {/* Poster */}
            <div className="w-full overflow-hidden rounded-lg border bg-black/10">
              <img
                className="w-full h-full object-cover aspect-[2/3]"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
              />
            </div>

            {/* Info */}
            <button className="w-full bg-gray-200 rounded-lg mt-2 p-3">
              <div className="flex items-center gap-2">
                <img className="w-4 h-4" src="star (2).png" alt="star" />
                <p className="text-sm sm:text-base">
                  {movie.vote_average?.toFixed(1)} / 10
                </p>
              </div>

              <p className="mt-1 text-left text-sm sm:text-base font-medium line-clamp-2">
                {movie.title}
              </p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
