"use client"
import Link from "next/link";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import { IconBtn } from "./components/basic/IconButton";
import React from "react";
export default function Home() {
  return (
    <div className="text-white  ">
      <header className="flex items-center justify-between p-2">
        <span className="">
          <p className="text-xl text-white font-bold hover:cursor-pointer">
            RealMeet
          </p>
        </span>
        {/* <h1 className="head">welcome to world of real talks</h1> */}
        <Link href="/profile">
          <IconBtn
            icon={Person2RoundedIcon}
            br="20px"
            size={40}
            color="white"
          />
        </Link>
      </header>

      <section className="flex flex-col  sm:flex-row justify-center mt-10 p-5 gap-5">
        <div className=" bg-gradient-to-br from-blue-900 to-sky-800 p-5  rounded-xl ">
          <p>Here you can have one to one video call with connected people</p>
          <Link href="/video-room">
            <button className="p-2 bg-gradient-to-br from-sky-800 to-blue-800 rounded-lg mt-4 hover:bg-slate-500 shadow-lg hover:shadow-blue-500">
              Video call room
            </button>
          </Link>
        </div>
        <div className=" bg-gradient-to-br from-blue-900 to-sky-800 p-5 rounded-xl  ">
          <p>Here you can have conversation with joined community</p>

          <Link href="/chat-room">
            <button className="p-2 bg-gradient-to-br from-sky-800 to-blue-800  rounded-lg mt-4 hover:bg-slate-500 shadow-lg hover:shadow-blue-500">
              Open chat room
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
