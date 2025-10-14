import { useEffect, useState, useRef } from "react";
import { RigthIcon } from "./icon/rigthicon";
import { WatchIcon } from "./icon/watchicon";
import { Lefticon } from "./icon/lefticon";
import { useRouter } from "next/navigation";

const apilink =
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
  const sliderWidth = 1440;

  const router = useRouter();

  const getData = async () => {
    setLoading(true);
    const data = await fetch(apilink, options);
    const jsonData = await data.json();
    setHerosActionData(jsonData.results);
    setLoading(false);
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
    if (herosActionData.length <= 1) return;
    const id = setInterval(() => {
      setCurrentSlider((i) => (i = 1) % herosActionData);
    }, 1000);
    return () => clearInterval(id);
  }, [herosActionData]);

  useEffect(() => {
    getData();
  }, []);

  const handleMovieClick = (movieID) => {
    router.push(`/movie-detail/${movieID}`);
  };

  if (loading) {
    return <div>...loading</div>;
  }

  const heroHandleNextBtn = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderWidth,
        behavior: "smooth",
      });
      setCurrentSlider((prev) => prev + 1);
    }
  };
  const handlePrevBtn = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderWidth,
        behavior: "smooth",
      });
      setCurrentSlider((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className="w-full">
      <div
        ref={sliderRef}
        className="w-[1440px] h-fit overflow-x-hidden scroll-smooth snap-x snap-mandatory"
      >
        <div className="flex w-[1440px] ">
          {herosActionData.map((movie) => {
            return (
              <div
                key={movie.id}
                className="cursor-pointer"
                onClick={() => handleMovieClick(movie.id)}
              >
                <div className="relative w-[1440px] h-[600px]">
                  <img
                    className="w-[1440px] object-center h-full"
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    alt={movie.title}
                  />
                  <div className="w-full h-full absolute top-0 left-0 z-10 flex flex-col justify-center gap-10 pl-10 pr-10 ">
                    <div>
                      <h1 className="text-white">Now playing</h1>
                      <h1 className="text-white text-4xl ">{movie.title}</h1>
                    </div>
                    <div className="flex">
                      <img className="w-[28px] h-[28px]" src="star (1).png" />
                      <h1 className="text-white">6.9|10</h1>
                    </div>
                    <div>
                      <h1 className="text-white w-[400px] h-[100px] ">
                        {movie.overview}
                      </h1>
                    </div>
                    <div>
                      <button
                        className="w-[150px] h-[40px] text-black border bg-white rounded-lg flex items-center justify-center gap-2 "
                        onClick={(e) => {
                          e.stopPropagation();
                          fetchTrailer(movie.id);
                        }}
                      >
                        <WatchIcon />
                        Watch Trailer
                      </button>
                    </div>
                  </div>
                  <div className="absolute top-70 right-0 z-10">
                    <button
                      className="border w-8 h-8 rounded-4xl flex justify-center items-center bg-white cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        heroHandleNextBtn();
                      }}
                    >
                      <RigthIcon />
                    </button>
                  </div>
                  <div className="absolute bottom-72 z-10 mt-[565px]">
                    <button
                      className="border w-8 h-8 rounded-4xl flex justify-center items-center bg-white cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevBtn();
                      }}
                    >
                      <Lefticon />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {trailerKey && (
        <div
          className="fixed p-4 inset-0   flex justify-center items-center z-10"
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
  );
};
