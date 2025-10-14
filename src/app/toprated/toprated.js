import { useEffect, useState } from "react";
import { SeeMoreIcon } from "../_component/icon/seemoreicon";
import { RigthIcon } from "../_component/icon/rigthicon";
import { Lefticon } from "../_component/icon/lefticon";
import { useRouter } from "next/navigation";
const apilink =
  "https:api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
export const TopRated = () => {
  const [topRatedData, setTopRatedData] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const getData = async () => {
    setLoading(true);
    const data = await fetch(apilink, options);
    const jsonData = await data.json();
    setTopRatedData(jsonData.results);
    setLoading(false);
  };

  console.log("loading", loading);
  console.log("topRated", topRatedData);

  useEffect(() => {
    getData();
  }, []);

  const handleMovieClick = (movieID) => {
    router.push(`/movie-detail/${movieID}`);
  };

  if (loading) {
    return <div>...loading</div>;
  }

  return (
    <div>
      <div className="flex justify-between mb-20 ">
        <h1 className="mt-10 text-3xl">TopRated</h1>
      </div>

      <div className="grid grid-cols-5 gap-15 mb-10 ">
        {topRatedData.map((movie) => {
          return (
            <div
              key={movie.id}
              className="cursor-pointer"
              onClick={() => handleMovieClick(movie.id)}
            >
              <div>
                <img
                  className=" w-[400px] h-[400px] rounded-lg border "
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                />
              </div>
              <div>
                <button className="border w-60 h-20 bg-gray-200 rounded-lg ">
                  <div className="flex justify-start ">
                    <img className="w-4 h-4" src="star (2).png" />
                    <p className="text-l">6.9|10</p>
                  </div>
                  <p className="flex justify-start">{movie.title}</p>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end">
        <button className="w-[300px] h-[40px] flex justify-between items-center ">
          <Lefticon />
          <h1 className="opacity-55">previous</h1>
          <h1 className="w-[20px] border flex justify-center items-center rounded-xl  h-[20px]">
            1
          </h1>
          <h1 className="w-[20px] border flex justify-center items-center rounded-xl h-[20px]">
            2
          </h1>
          <h1 className="w-[20px] border flex justify-center items-center rounded-xl h-[20px]">
            3
          </h1>
          <h1 className="w-[20px] border flex justify-center items-center rounded-xl h-[20px]">
            4
          </h1>
          <h1 className="w-[20px]  flex justify-center items-center h-[20px]">
            ...
          </h1>
          <h1 className="w-[20px] border flex justify-center items-center rounded-xl h-[20px]">
            5
          </h1>
          <h1 className="w-[20px]  h-[20px]"> next</h1>
          <RigthIcon />
        </button>
      </div>
    </div>
  );
};
