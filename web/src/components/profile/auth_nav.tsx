import React from "react";
import Link from "next/link";
const AuthNav = ({text}:{text?:string}) => {
  return (
    <div className=" mx-auto bg-slate-200   text-slate-800  shadow-lg  p-6 w-3/5 md:w-1/2 m-auto flex flex-col items-center rounded-xl relative top-40  ">
      <h1 className="align-center text-center text-xl text-slate-400">
        {text ? text : "You need to Authenticate"}
      </h1>
      <div className="flex justify-between items-center  mx-auto gap-4 text-slate-500">
        <Link href="/login">
          <button className="p-2 w-16 bg-blue-400 text-slate-100 rounded-lg mt-4 tracking-wide hover:bg-blue-500 ">
            Login
          </button>
        </Link>

        <Link href="/signup">
          <button className="p-2 w-16 tracking-wide  bg-blue-400 text-slate-100  rounded-lg mt-4  hover:bg-blue-500 ">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AuthNav;
