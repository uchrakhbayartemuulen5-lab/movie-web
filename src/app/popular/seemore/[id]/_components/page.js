"use client";

import { Header } from "@/app/_component/Header";
import { Blue } from "@/app/_component/Blue";
import { SeeMore } from "../../../../_component/SeeMore";
export default function Home() {
  return (
    <div className="bg-white">
      <div className="w-[1440px] m-auto">
        <Header />
        <SeeMore />
        <Blue />
      </div>
    </div>
  );
}
