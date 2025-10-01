"use client";

import { Blue } from "../_component/Blue";
import { Header } from "../_component/Header";
import { TopRated } from "./toprated";
export default function Home() {
  return (
    <div className="bg-white">
      <div className="w-[1440px] m-auto">
        <Header />
        <TopRated />
        <Blue />
      </div>
    </div>
  );
}
