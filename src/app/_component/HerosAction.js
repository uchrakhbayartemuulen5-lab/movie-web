import { useEffect, useState } from "react";
import { RigthIcon } from "./rigthicon";
import { WatchIcon } from "./icon/watchicon";
import { useRef } from "react";
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
  const sliderRef = useRef(null);
  const sliderWidth = 1440;

  const router = useRouter();

  const getData = async () => {
    setLoading(true);
    const data = await fetch(apilink, options);
    const jsonData = await data.json();
    console.log("hahaha", jsonData);

    setHerosActionData(jsonData.results);
    setLoading(false);
  };

  console.log("loading", loading);
  console.log("herosAction", herosActionData);

  useEffect(() => {
    getData();
  }, []);
  if (loading) {
    return <div>...loading</div>;
  }

  const handleNextBtn = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: sliderWidth, behaviour: "smooth" });
      setCurrentSlider((prev = prev + 1));
    }
  };

  const handleMovieClick = () => {
    router.push("./movie-details/${movieID}");
  };

  return (
    <div className=" w-full " onClick={handleMovieClick}>
      <div
        className="w-[1440px] h-fit overflow-x-scroll scroll-smooth snap-x snap-mandatory"
        ref={sliderRef}
      >
        <div className="flex w-[1440px] ">
          {herosActionData.map((movie, index) => {
            return (
              <div key={index}>
                <div className="relative w-[1440px] h-[600px]">
                  <img
                    className=" w-[1440px] object-center h-full "
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  />
                  <div className="w-full h-full absolute top-0 left-0 z-10  flex flex-col justify-center gap-10 pl-10 pr-10 ">
                    <div>
                      <h1 className="text-white">Now playing</h1>
                      <h1 className="text-white text-4xl ">{movie.title}</h1>
                    </div>
                    <div className="flex">
                      <img className="w-[28px] h-[28px] " src="star (1).png" />
                      <h1 className="text-white">6.9|10</h1>
                    </div>
                    <div>
                      <h1 className="text-white w-[400px] h-[100px] ">
                        {movie.overview}
                      </h1>
                    </div>
                    <div>
                      <button className="w-[150px] h-[40px] text-black border bg-white rounded-lg flex items-center justify-center gap-2 ">
                        <WatchIcon />
                        Watch Trailer
                      </button>
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 z-10 flex justify-center items">
                    <button
                      className="border w-8 h-8 rounded-4xl flex justify-center items-center bg-white cursor-pointer"
                      onClick={handleNextBtn}
                    >
                      <RigthIcon />
                    </button>
                  </div>
                  <div className="absolute top-0 left-0 z-10 flex justify-start items-start">
                    <button
                      className="border w-8 h-8 rounded-4xl flex justify-center items-center bg-white cursor-pointer"
                      onClick={handleNextBtn}
                    >
                      <RigthIcon />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
