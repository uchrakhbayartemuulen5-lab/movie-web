import { SeeMoreIcon } from "./seemoreicon";
export const UpComing = () => {
  return (
    <div>
      <div className="flex justify-between mb-20 ">
        <h1 className="mt-10 text-3xl">Upcoming</h1>
        <h1 className="mt-10 text-1xl flex justify-center items-center ">
          See More
          <SeeMoreIcon />
        </h1>
      </div>

      <div className="flex gap-15 mb-10 ">
        <div>
          <div>
            <img
              className=" w-60 h-100 rounded-lg border "
              src="dearsanta.jpg"
            />
          </div>
          <div>
            <button className="border w-60 h-20 bg-gray-200 rounded-lg ">
              <div className="flex justify-start ">
                <img className="w-4 h-4" src="star (2).png" />
                <p className="text-l">6.9|10</p>
              </div>
              <p className="flex justify-start">Dear Santa</p>
            </button>
          </div>
        </div>

        <div>
          <div>
            <img className=" w-60 h-100 rounded-lg border " src="dragon.jpg" />
          </div>
          <div>
            <button className="border w-60 h-20 bg-gray-200 rounded-lg ">
              <div className="flex justify-start ">
                <img className="w-4 h-4" src="star (2).png" />
                <p className="text-l">6.9|10</p>
              </div>
              <p className="flex justify-start">Dragon</p>
            </button>
          </div>
        </div>
        <div>
          <div>
            <img className=" w-60 h-100 rounded-lg border " src="alien.jpg" />
          </div>
          <div>
            <button className="border w-60 h-20 bg-gray-200 rounded-lg ">
              <div className="flex justify-start ">
                <img className="w-4 h-4" src="star (2).png" />
                <p className="text-l">6.9|10</p>
              </div>
              <p className="flex justify-start">Alien</p>
            </button>
          </div>
        </div>
        <div>
          <div>
            <img className=" w-60 h-100 rounded-lg border " src="ashes.jpg" />
          </div>
          <div>
            <button className="border w-60 h-20 bg-gray-200 rounded-lg ">
              <div className="flex justify-start ">
                <img className="w-4 h-4" src="star (2).png" />
                <p className="text-l">6.9|10</p>
              </div>
              <p className="flex justify-start">Ashes</p>
            </button>
          </div>
        </div>
        <div>
          <div>
            <img className=" w-60 h-100 rounded-lg border " src="doog.jpg" />
          </div>
          <div>
            <button className="border w-60 h-20 bg-gray-200 rounded-lg ">
              <div className="flex justify-start ">
                <img className="w-4 h-4" src="star (2).png" />
                <p className="text-l">6.9|10</p>
              </div>
              <p className="flex justify-start">Space Dogg</p>
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-15  ">
        <div>
          <div>
            <img className=" w-60 h-100 rounded-lg border " src="order.jpg" />
          </div>
          <div>
            <button className="border w-60 h-20 bg-gray-200 rounded-lg ">
              <div className="flex justify-start ">
                <img className="w-4 h-4" src="star (2).png" />
                <p className="text-l">6.9|10</p>
              </div>
              <p className="flex justify-start">The order</p>
            </button>
          </div>
        </div>
        <div>
          <div>
            <img className=" w-60 h-100 rounded-lg border " src="y2k.jpg" />
          </div>
          <div>
            <button className="border w-60 h-20 bg-gray-200 rounded-lg ">
              <div className="flex justify-start ">
                <img className="w-4 h-4" src="star (2).png" />
                <p className="text-l">6.9|10</p>
              </div>
              <p className="flex justify-start">Y2K</p>
            </button>
          </div>
        </div>
        <div>
          <div>
            <img
              className=" w-60 h-100 rounded-lg border "
              src="leveling.jpg"
            />
          </div>
          <div>
            <button className="border w-60 h-20 bg-gray-200 rounded-lg ">
              <div className="flex justify-start ">
                <img className="w-4 h-4" src="star (2).png" />
                <p className="text-l">6.9|10</p>{" "}
              </div>
              <p className="flex justify-start">Solo Leveling ReAwakening </p>
            </button>
          </div>
        </div>
        <div>
          <div>
            <img className=" w-60 h-100 rounded-lg border " src="getaway.jpg" />
          </div>
          <div>
            <button className="border w-60 h-20 bg-gray-200 rounded-lg ">
              <div className="flex justify-start ">
                <img className="w-4 h-4" src="star (2).png" />
                <p className="text-l">6.9|10</p>
              </div>
              <p className="flex justify-start">Get Away</p>
            </button>
          </div>
        </div>
        <div>
          <div>
            <img className=" w-60 h-100 rounded-lg border " src="sonic.png" />
          </div>
          <div>
            <button className="border w-60 h-20 bg-gray-200 rounded-lg ">
              <div className="flex justify-start ">
                <img className="w-4 h-4" src="star (2).png" />
                <p className="text-l">6.9|10</p>
              </div>
              <p className="flex justify-start">Sonic The Hedgehog 3</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
