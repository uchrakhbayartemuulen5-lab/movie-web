import { SeeMoreIcon } from "./seemoreicon";
export const TopRated = () => {
  return (
    <div>
      <div className="flex justify-between mb-20 ">
        <h1 className="mt-10 text-3xl">Top rated</h1>
        <h1 className="mt-10 text-1xl flex justify-center items-center ">
          See More
          <SeeMoreIcon />
        </h1>
      </div>
      <div className="flex gap-15 mb-[30px] ">
        <div>
          <div>
            <img
              className=" w-60 h-100 rounded-lg border "
              src="shawshank.jpg"
            />
          </div>
          <div>
            <button className="border w-60 h-20 bg-gray-200 rounded-lg ">
              <div className="flex justify-start ">
                <img className="w-4 h-4" src="star (2).png" />
                <p className="text-l">6.9|10</p>{" "}
              </div>
              <p className="flex justify-start">The Shawshank Redemption</p>
            </button>
          </div>
        </div>
        <div>
          <div>
            <img
              className=" w-60 h-100 rounded-lg border "
              src="godfather.jpg"
            />
          </div>
          <div>
            <button className="border w-60 h-20 bg-gray-200 rounded-lg ">
              <div className="flex justify-start ">
                <img className="w-4 h-4" src="star (2).png" />
                <p className="text-l">6.9|10</p>{" "}
              </div>
              <p className="flex justify-start">The GodFhather</p>
            </button>
          </div>
        </div>
        <div>
          <div>
            <img className=" w-60 h-100 rounded-lg border " src="dark.jpg" />
          </div>
          <div>
            <button className="border w-60 h-20 bg-gray-200 rounded-lg ">
              <div className="flex justify-start ">
                <img className="w-4 h-4" src="star (2).png" />
                <p className="text-l">6.9|10</p>{" "}
              </div>
              <p className="flex justify-start">The Dark Knight</p>
            </button>
          </div>
        </div>
        <div>
          <div>
            <img className=" w-60 h-100 rounded-lg border " src="angry.jpg" />
          </div>
          <div>
            <button className="border w-60 h-20 bg-gray-200 rounded-lg ">
              <div className="flex justify-start ">
                <img className="w-4 h-4" src="star (2).png" />
                <p className="text-l">6.9|10</p>{" "}
              </div>
              <p className="flex justify-start">12 Angry Man</p>
            </button>
          </div>
        </div>
        <div>
          <div>
            <img className=" w-60 h-100 rounded-lg border " src="rings.jpg" />
          </div>
          <div>
            <button className="border w-60 h-20 bg-gray-200 rounded-lg ">
              <div className="flex justify-start ">
                <img className="w-4 h-4" src="star (2).png" />
                <p className="text-l">6.9|10</p>{" "}
              </div>
              <p className="flex justify-start">
                The Lord Of Rings:The Return Of the King
              </p>
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-15 mb-20 ">
        <div>
          <div>
            <img
              className=" w-60 h-100 rounded-lg border "
              src="shawshank.jpg"
            />
          </div>
          <div>
            <button className="border w-60 h-20 bg-gray-200 rounded-lg ">
              <div className="flex justify-start ">
                <img className="w-4 h-4" src="star (2).png" />
                <p className="text-l">6.9|10</p>{" "}
              </div>
              <p className="flex justify-start">The Shawshank Redemption</p>
            </button>
          </div>
        </div>
        <div>
          <div>
            <img
              className=" w-60 h-100 rounded-lg border "
              src="godfather.jpg"
            />
          </div>
          <div>
            <button className="border w-60 h-20 bg-gray-200 rounded-lg ">
              <div className="flex justify-start ">
                <img className="w-4 h-4" src="star (2).png" />
                <p className="text-l">6.9|10</p>{" "}
              </div>
              <p className="flex justify-start">The GodFhather</p>
            </button>
          </div>
        </div>
        <div>
          <div>
            <img className=" w-60 h-100 rounded-lg border " src="dark.jpg" />
          </div>
          <div>
            <button className="border w-60 h-20 bg-gray-200 rounded-lg ">
              <div className="flex justify-start ">
                <img className="w-4 h-4" src="star (2).png" />
                <p className="text-l">6.9|10</p>{" "}
              </div>
              <p className="flex justify-start">The Dark Knight</p>
            </button>
          </div>
        </div>
        <div>
          <div>
            <img className=" w-60 h-100 rounded-lg border " src="angry.jpg" />
          </div>
          <div>
            <button className="border w-60 h-20 bg-gray-200 rounded-lg ">
              <div className="flex justify-start ">
                <img className="w-4 h-4" src="star (2).png" />
                <p className="text-l">6.9|10</p>{" "}
              </div>
              <p className="flex justify-start">12 Angry Man</p>
            </button>
          </div>
        </div>
        <div>
          <div>
            <img className=" w-60 h-100 rounded-lg border " src="rings.jpg" />
          </div>
          <div>
            <button className="border w-60 h-20 bg-gray-200 rounded-lg ">
              <div className="flex justify-start ">
                <img className="w-4 h-4" src="star (2).png" />
                <p className="text-l">6.9|10</p>{" "}
              </div>
              <p className="flex justify-start">
                The Lord Of Rings:The Return Of the King
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
