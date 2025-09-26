import { useEffect, useState } from "react";
import { RigthIcon } from "./rigthicon";
import { WatchIcon } from "./icon/watchicon";

const apiLink =
  "https://image.tmdb.org/t/p/movie/now_playing?language=en-US&page=1";

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

  const getData = async () => {
    setLoading(true);
    const data = await Fetch(apiLink, options);
    const jsonData = await data.json();
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
  return (
    <div className="w-screen h-fit overflow-x-auto">
      <div className="flex w-[1440px] ">
        {herosActionData.slice(0, 10).map((movie, index) => {
          return (
            <div key={index} className="relative w-full h-[600px] ">
              <img
                className="w-full h-full"
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
                <button className="border w-8 h-8 rounded-4xl flex justify-center items-center bg-white ">
                  <RigthIcon />
                </button>
              </div>
            </div>
          );
        })}
        ;
      </div>
    </div>
  );
};
