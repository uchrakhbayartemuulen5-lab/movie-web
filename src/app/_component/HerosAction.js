import { RigthIcon } from "./rigthicon";
import { WatchIcon } from "./icon/watchicon";

export const HerosAction = () => {
  return (
    <div className="w-screen h-fit overflow-x-auto">
      <div className="flex w-[4320px] ">
        <div className="relative w-full h-[600px] ">
          <img className="w-full h-full" src="photo.jpg" />
          <div className="w-full h-full absolute top-0 left-0 z-10  flex flex-col justify-center gap-10 pl-10 pr-10 ">
            <div>
              <h1 className="text-white">Now playing</h1>
              <h1 className="text-white text-4xl ">Wicked</h1>
            </div>
            <div className="flex">
              <img className="w-[28px] h-[28px] " src="star (1).png" />
              <h1 className="text-white">6.9|10</h1>
            </div>
            <div>
              <h1 className="text-white w-[400px] h-[100px] ">
                Elphaba, a misunderstood young woman because of her green skin,
                and Glinda, a popular girl, become friends at Shiz University in
                the Land of Oz. After an encounter with the Wonderful Wizard of
                Oz, their friendship reaches a crossroads.
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

        <div className="relative w-full h-[600px]">
          <img className="w-full h-full" src="gladiator.png" />
          <div className="w-full h-full absolute top-0 left-0 z-10  flex flex-col justify-center gap-10 pl-10 pr-10 ">
            <div>
              <h1 className="text-white">Now playing</h1>
              <h1 className="text-white text-4xl ">Gladiator 2</h1>
            </div>
            <div className="flex">
              <img className="w-[28px] h-[28px] " src="star (1).png" />
              <h1 className="text-white">6.9|10</h1>
            </div>
            <div>
              <h1 className="text-white w-[400px] h-[100px] ">
                After his home is conquered by the tyrannical emperors who now
                lead Rome, Lucius is forced to enter the Colosseum and must look
                to his past to find strength to return the glory of Rome to its
                people.
              </h1>
            </div>
            <div>
              <button className="w-[150px] h-[40px] text-black border bg-white rounded-lg flex items-center justify-center gap-2 ">
                <WatchIcon />
                Watch Trailer
              </button>
            </div>
          </div>
          <div className="absolute top-0 left-0 z-10  ">
            <button className="border w-8 h-8 rounded-4xl flex justify-center items-center  bg-white ">
              <RigthIcon />
            </button>
          </div>
        </div>

        <div className="relative w-full h-[600px]">
          <img className="w-full h-full" src="moana.jpg" />
          <div className="w-full h-full absolute top-0 left-0 z-10  flex flex-col justify-center gap-10 pl-10 pr-10 ">
            <div>
              <h1 className="text-white">Now playing</h1>
              <h1 className="text-white text-4xl ">Moana 2 </h1>
            </div>
            <div className="flex">
              <img className="w-[28px] h-[28px] " src="star (1).png" />
              <h1 className="text-white">6.9|10</h1>
            </div>
            <div>
              <h1 className="text-white w-[400px] h-[100px] ">
                After receiving an unexpected call from her wayfinding
                ancestors, Moana must journey to the far seas of Oceania and
                into dangerous, long-lost waters for an adventure unlike
                anything she's ever faced.
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
      </div>
    </div>
  );
};
