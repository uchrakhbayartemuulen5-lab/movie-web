import { DownIcon } from "./icon/dowIcon";
import { SearchIcon } from "./icon/searchIcon";
import { MoonIcon } from "./icon/moonicon";

export const Header = () => {
  return (
    <div className="flex justify-between p-[30px] ">
      <div>
        <img
          className="flex justify-center w-[92px] h-[20px]"
          src="Logo.png"
        ></img>
      </div>
      <div className="flex justify-between gap-[10px]">
        <button className=" min-w-[100px] min-h-[10px] border flex items-center justify-center rounded-lg">
          <DownIcon />
          Genre
        </button>
        <div className="flex gap-2 items-center border rounded-lg px-3">
          <SearchIcon />
          <input className="min-w-[100px] min-h-[10px] border-none " />
        </div>
      </div>
      <div>
        <button className=" min-w-[30px] min-h-[30px] flex justify-center border ">
          <MoonIcon />
        </button>
      </div>
    </div>
  );
};
