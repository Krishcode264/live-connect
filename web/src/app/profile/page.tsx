"use client";
import React from "react";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../store/selectors/user-selector";
const page = () => {
  const { name, id } = useRecoilValue(userInfoState);
  return (
    <div className="border rounded-lg w-[50%] mx-auto mt-8 p-2 ">
      <h2>Name: {name}</h2>
      <h2>ID: {id}</h2>
    </div>
  );
};

export default page;
