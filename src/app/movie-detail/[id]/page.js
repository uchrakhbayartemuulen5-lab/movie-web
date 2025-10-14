"use client";

import { Blue } from "@/app/_component/Blue";
import { Coming } from "@/app/_component/coming";
import { TrailerIcon } from "@/app/_component/icon/trailericon";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [error, setError] = useState(null);

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

      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        alert("Trailer олдсонгүй");
      }
    } catch (error) {
      console.error("Trailer fetch алдаа:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieRes, creditsRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
            options
          ),
          fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, options),
        ]);

        if (!movieRes.ok) {
          throw new Error(`Movie fetch failed: ${movieRes.statusText}`);
        }
        if (!creditsRes.ok) {
          throw new Error(`Credits fetch failed: ${creditsRes.statusText}`);
        }

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

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!movie || !credits) return <div>Loading...</div>;

  const directors = credits.crew.filter((member) => member.job === "Director");
  const writers = credits.crew.filter(
    (member) =>
      member.job === "Screenplay" ||
      member.job === "Writer" ||
      member.job === "Story"
  );
  const stars = credits.cast.slice(0, 10);

  return (
    <div className="flex justify-center items-center ">
      <div className="p-10 w-[1440px]">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
            <p className="mb-2">
              <strong>Release Date:</strong> {movie.release_date}
            </p>
          </div>
          <p className="mb-2">
            <strong>Rating:</strong> {movie.vote_average.toFixed(1)} / 10
          </p>
        </div>

        <div className="flex gap-10 ">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
            className=" w-[400px] h-[600px] rounded-lg mb-4"
          />
          <div className="relative">
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.title}
              className=" w-[1000px] h-[600px] rounded-lg mb-4"
            />
            <div className="absolute  z-10">
              <button
                className="flex justify-center items-center"
                onClick={() => fetchTrailer(movie.id)}
              >
                <TrailerIcon />
                Watch Trailer
              </button>
            </div>
          </div>
        </div>

        <p className="mb-2  ">
          <strong>Overview:</strong> {movie.overview}
        </p>

        <p className="mb-2 p-3 border-b ">
          <strong>Director:</strong>{" "}
          {directors.length > 0
            ? directors.map((d) => d.name).join(", ")
            : "N/A"}
        </p>

        <p className="mb-2 p-3 border-b ">
          <strong>Writers:</strong>{" "}
          {writers.length > 0 ? writers.map((w) => w.name).join(", ") : "N/A"}
        </p>

        <p className="mb-2 p-3 border-b ">
          <strong>Stars:</strong>
          {stars.length > 0 ? stars.map((s) => s.name).join(", ") : "N/A"}
        </p>
        <div>
          <div>
            <Coming id={id} />
          </div>
          <Blue />
        </div>
        {trailerKey && (
          <div
            className="absolute p-4 inset-0 flex justify-center items-center  z-10"
            onClick={() => setTrailerKey(null)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <iframe
                width="800"
                height="450"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={() => setTrailerKey(null)}
                className="mt-2 w-full bg-gray-500  rounded p-2 text-white "
              >
                😎Anhaaral handuulsan yvdald bayrlalaa😎duussan bol haa g****
                mini🙂‍↕️
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
