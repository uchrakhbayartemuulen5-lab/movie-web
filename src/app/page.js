"use client";

import { Blue } from "./_component/Blue";
import { Popular } from "./_component/Popular";
import { Header } from "./_component/Header";
import { HerosAction } from "./_component/HerosAction";
import { TopRated } from "./_component/TopRated";
import { UpComing } from "./_component/UpComing";
export default function Home() {
  return (
    <div className="bg-white ">
      <div className="w-[1440px] m-auto">
        <Header />
        <HerosAction />
        <UpComing />
        <Popular />
        <TopRated />
        <Blue />
      </div>
    </div>
  );
}
