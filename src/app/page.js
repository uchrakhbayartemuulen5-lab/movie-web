"use client";
import "./globals.css";
import { Header } from "./_component/header";
import { HerosAction } from "./_component/HerosAction";
import { UpComing } from "./_component/UpComing";
import { Popular } from "./_component/popular";
import { TopRated } from "./_component/TopRated";
import { Blue } from "./_component/Blue";
import { Genre } from "./_component/Genre";
export default function Home() {
  return (
    <div className="bg-white">
      <div className="w-[1440px] m-auto">
        <Header />
        <Genre />
        <HerosAction />
        <UpComing />
        <Popular />
        <TopRated />
        <Blue />
      </div>
    </div>
  );
}
