"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Lefticon } from "@/app/_component/icon/lefticon";
import { RigthIcon } from "@/app/_component/icon/rigthicon";
import Link from "next/link";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const SeeMore = () => {
  const { id } = useParams();
  const router = useRouter();

  const apilink = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;

  const [seeMore, setSeeMore] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await fetch(apilink, options);
      const jsonData = await data.json();
      setSeeMore(jsonData.results || []);
    } catch (err) {
      console.error("Error fetching seeMore movies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleMovieClick = (movieID) => {
    router.push(`/movie-detail/${movieID}`);
  };

  if (loading) return <div>...loading</div>;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12">
        <h1 className="mt-6 sm:mt-10 text-2xl sm:text-3xl font-semibold">
          More like this
        </h1>

        {/* Буцах линк (хүсвэл) */}
        <Link
          href={`/movie-detail/${id}`}
          className="w-fit text-sm sm:text-base hover:underline"
        >
          Back
        </Link>
      </div>

      {/* Grid responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 mb-10">
        {seeMore.map((movie) => (
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
            <div className="w-full bg-gray-200 rounded-lg mt-2 p-3">
              <div className="flex items-center gap-2">
                <img className="w-4 h-4" src="/star (2).png" alt="star" />
                <p className="text-sm sm:text-base">
                  {movie.vote_average?.toFixed?.(1) ?? "—"} / 10
                </p>
              </div>

              <p className="mt-1 text-left text-sm sm:text-base font-medium line-clamp-2">
                {movie.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center sm:justify-end">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100">
            <Lefticon />
            <span className="hidden sm:inline opacity-60">previous</span>
          </button>

          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              className="w-8 h-8 border rounded-lg flex items-center justify-center hover:bg-gray-50"
            >
              {n}
            </button>
          ))}

          <span className="px-1 opacity-60">…</span>

          <button className="w-8 h-8 border rounded-lg flex items-center justify-center hover:bg-gray-50">
            5
          </button>

          <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100">
            <span className="hidden sm:inline opacity-60">next</span>
            <RigthIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
