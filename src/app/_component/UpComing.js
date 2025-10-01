import { useEffect, useState } from "react";
import { SeeMoreIcon } from "./seemoreicon";
import Link from "next/link";
import { useRouter } from "next/navigation";
const apilink =
  "https:api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

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
    const data = await fetch(apilink, options);
    const jsonData = await data.json();
    setUpComingData(jsonData.results);
    setLoading(false);
  };

  console.log("loading", loading);
  console.log("upcoming", upComingData);

  useEffect(() => {
    getData();
  }, []);
  if (loading) {
    return <div>...loading</div>;
  }
  const handleMovieClick = () => {
    router.push("./movie-details/${movieID}");
  };

  return (
    <div>
      <div className="flex justify-between mb-20 ">
        <h1 className="mt-10 text-3xl">Upcoming</h1>
        <Link
          href={"upcoming"}
          className="mt-10 text-1xl flex justify-center items-center "
        >
          See More
          <SeeMoreIcon />
        </Link>
      </div>

      <div
        className="grid grid-cols-5 gap-15 mb-10 "
        onClick={handleMovieClick}
      >
        {upComingData.slice(0, 10).map((movie, index) => {
          return (
            <div key={index}>
              <div>
                <img
                  className=" w-60 h-[300px] rounded-lg border "
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
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
    </div>
  );
};
