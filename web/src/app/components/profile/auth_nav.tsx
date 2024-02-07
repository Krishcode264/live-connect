import React from "react";
import Link from "next/link";
const AuthNav = () => {
  return (
    <div className=" mx-auto   text-slate-800 bg-gradient-to-br from-sky-900 to-blue-900 shadow-lg shadow-sky-700 p-6 w-3/5 md:w-1/2 m-auto flex flex-col items-center rounded-xl relative top-40  ">
      <h1 className="align-center text-center text-xl text-slate-400">
        You need to Authenticate
      </h1>
      <div className="flex justify-between items-center  mx-auto gap-4 text-slate-500">
        <Link href="/login">
          <button className="p-2 w-16 bg-gradient-to-br from-sky-800 to-blue-800  rounded-lg mt-4 tracking-wide hover:bg-slate-500 shadow-lg hover:shadow-blue-500 hover:text-rose-600 ">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="p-2 w-16 bg-gradient-to-br from-sky-800 to-blue-800 tracking-wide  rounded-lg mt-4 hover:bg-slate-500 shadow-lg hover:shadow-blue-500 hover:text-rose-600 ">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AuthNav;
