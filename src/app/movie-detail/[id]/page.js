"use client";

import { Blue } from "@/app/_component/Blue";
import { Coming } from "@/app/_component/coming";
import { Header } from "@/app/_component/Header";
import { StarIcon } from "@/app/_component/icon/phone";
import { TrailerIcon } from "@/app/_component/icon/trailericon";
import { LoadingSection } from "@/app/movieDetailLoading";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [error, setError] = useState(null);
  const [delayLoading, setDelayLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setDelayLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
    },
  };

  const fetchTrailer = async (movieId) => {
    try {
      const trailerApi = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
      const response = await fetch(trailerApi, options);
      const data = await response.json();

      const trailer = (data.results || []).find(
        (video) => video.type === "Trailer" && video.site === "YouTube",
      );

      if (trailer) setTrailerKey(trailer.key);
      else alert("Trailer олдсонгүй");
    } catch (error) {
      console.error("Trailer fetch алдаа:", error);
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [movieRes, creditsRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
            options,
          ),
          fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, options),
        ]);

        if (!movieRes.ok)
          throw new Error(`Movie fetch failed: ${movieRes.statusText}`);
        if (!creditsRes.ok)
          throw new Error(`Credits fetch failed: ${creditsRes.statusText}`);

        const movieData = await movieRes.json();
        const creditsData = await creditsRes.json();

        setMovie(movieData);
        setCredits(creditsData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setMovie(null);
        setCredits(null);
      }
    };

    fetchData();
  }, [id]);

  if (error)
    return <div className="text-red-500 px-4 py-6">Error: {error}</div>;

  if (delayLoading) {
    return (
      <div>
        <LoadingSection />
      </div>
    );
  }

  if (!movie || !credits)
    return <div className="text-center py-20">No data found</div>;

  const directors = (credits.crew || []).filter((m) => m.job === "Director");
  const writers = (credits.crew || []).filter(
    (m) => m.job === "Screenplay" || m.job === "Writer" || m.job === "Story",
  );
  const stars = (credits.cast || []).slice(0, 10);

  return (
    <div className="w-full">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 break-words">
              {movie.title}
            </h1>
            <p className="text-sm sm:text-base">
              <span className="font-semibold">Release Date:</span>{" "}
              {movie.release_date}
            </p>
          </div>

          <p className="flex items-center gap-2 text-sm sm:text-base">
            <span className="font-semibold">Rating:</span>
            <StarIcon />
            {movie.vote_average?.toFixed?.(1) ?? "—"} / 10
          </p>
        </div>

        <div className="mt-6 flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-10">
          <div className="w-full lg:w-[320px]">
            <div className="w-full max-w-sm lg:max-w-none overflow-hidden rounded-lg border bg-black/10">
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover aspect-[2/3]"
                loading="lazy"
              />
            </div>
          </div>

          <div className="relative w-full">
            <div className="w-full overflow-hidden rounded-lg bg-black">
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover brightness-[50%] aspect-video md:aspect-[16/7]"
                loading="lazy"
              />
            </div>

            <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5">
              <button
                className="flex items-center gap-2 text-white  px-3 py-2 rounded-lg text-sm sm:text-base"
                onClick={() => fetchTrailer(movie.id)}
              >
                <TrailerIcon />
                Watch Trailer
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <p className="text-sm sm:text-base leading-relaxed">
            <span className="font-semibold">Overview:</span> {movie.overview}
          </p>

          <p className="py-3 border-b text-sm sm:text-base">
            <span className="font-semibold">Director:</span>{" "}
            {directors.length ? directors.map((d) => d.name).join(", ") : "N/A"}
          </p>

          <p className="py-3 border-b text-sm sm:text-base">
            <span className="font-semibold">Writers:</span>{" "}
            {writers.length ? writers.map((w) => w.name).join(", ") : "N/A"}
          </p>

          <p className="py-3 border-b text-sm sm:text-base">
            <span className="font-semibold">Stars:</span>{" "}
            {stars.length ? stars.map((s) => s.name).join(", ") : "N/A"}
          </p>
        </div>

        <div className="mt-8">
          <Coming id={id} />
        </div>

        <div className="mt-10">
          <Blue />
        </div>
      </div>

      {trailerKey && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-md flex justify-center items-center z-[9999] p-4"
          onClick={() => setTrailerKey(null)}
        >
          <div
            className="w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full aspect-video overflow-hidden rounded-lg bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <button
              onClick={() => setTrailerKey(null)}
              className="mt-3 w-full bg-gray-600 hover:bg-gray-700 rounded p-2 text-white cursor-pointer"
            >
              close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
