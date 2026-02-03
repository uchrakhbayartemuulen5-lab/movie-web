import { useEffect, useMemo, useRef, useState } from "react";
import { RigthIcon } from "./icon/rigthicon";
import { WatchIcon } from "./icon/watchicon";
import { Lefticon } from "./icon/lefticon";
import { useRouter } from "next/navigation";

const apiLink =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const HerosAction = () => {
  const [herosActionData, setHerosActionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSlider, setCurrentSlider] = useState(0);
  const [trailerKey, setTrailerKey] = useState(null);

  const sliderRef = useRef(null);
  const router = useRouter();

  const count = useMemo(() => herosActionData.length, [herosActionData.length]);

  const getData = async () => {
    setLoading(true);
    try {
      const data = await fetch(apiLink, options);
      const jsonData = await data.json();
      setHerosActionData(jsonData.results || []);
    } finally {
      setLoading(false);
    }
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
    getData();
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el || count === 0) return;

    const width = el.clientWidth || 0;
    el.scrollTo({ left: currentSlider * width, behavior: "smooth" });
  }, [currentSlider, count]);

  useEffect(() => {
    if (count <= 1) return;

    const id = setInterval(() => {
      setCurrentSlider((prev) => (prev + 1) % count);
    }, 4000);

    return () => clearInterval(id);
  }, [count]);

  const handleMovieClick = (movieID) => {
    router.push(`/movie-detail/${movieID}`);
  };

  const heroHandleNextBtn = () => {
    setCurrentSlider((prev) => Math.min(prev + 1, count - 1));
  };

  const handlePrevBtn = () => {
    setCurrentSlider((prev) => Math.max(prev - 1, 0));
  };

  if (loading) return <div>...loading</div>;

  return (
    <div className="w-full">
      <div
        ref={sliderRef}
        className="w-full overflow-x-hidden overflow-y-hidden scroll-smooth snap-x snap-mandatory"
      >
        <div className="flex w-full">
          {herosActionData.map((movie) => (
            <div
              key={movie.id}
              className="w-full shrink-0 snap-start cursor-pointer"
              onClick={() => handleMovieClick(movie.id)}
            >
              <div className="relative w-full">
                {/* Image */}
                <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-black">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    alt={movie.title}
                    loading="lazy"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

                <div className="absolute inset-0 z-10 flex flex-col justify-center gap-3 md:gap-6 px-4 md:px-10">
                  <div>
                    <h1 className="text-white/90 text-xs sm:text-sm md:text-base">
                      Now playing
                    </h1>
                    <h1 className="text-white text-xl sm:text-2xl md:text-4xl font-semibold line-clamp-2">
                      {movie.title}
                    </h1>
                  </div>

                  <div className="flex items-center gap-2">
                    <img
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                      src="star (1).png"
                      alt="star"
                    />
                    <p className="text-white text-xs sm:text-sm md:text-base">
                      {movie.vote_average?.toFixed?.(1) ?? "—"} / 10
                    </p>
                  </div>

                  <p className="text-white/90 text-xs sm:text-sm md:text-base max-w-xl line-clamp-2 sm:line-clamp-3 md:line-clamp-4">
                    {movie.overview}
                  </p>

                  <div>
                    <button
                      className="w-[140px] sm:w-[150px] h-9 sm:h-10 text-sm sm:text-base text-black bg-white rounded-lg flex items-center justify-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        fetchTrailer(movie.id);
                      }}
                    >
                      <WatchIcon />
                      Trailer
                    </button>
                  </div>
                </div>

                <button
                  className="absolute top-1/2 -translate-y-1/2 right-3 md:right-6 z-20 border w-9 h-9 rounded-full flex justify-center items-center bg-white/90 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    heroHandleNextBtn();
                  }}
                  aria-label="Next"
                >
                  <RigthIcon />
                </button>

                <button
                  className="absolute top-1/2 -translate-y-1/2 left-3 md:left-6 z-20 border w-9 h-9 rounded-full flex justify-center items-center bg-white/90 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevBtn();
                  }}
                  aria-label="Previous"
                >
                  <Lefticon />
                </button>
              </div>
            </div>
          ))}
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
