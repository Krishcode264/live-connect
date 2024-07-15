"use client"
import React, { useEffect } from "react";
import Header from "@/components/my-profile/Header";

import { Button } from "@/components/basic/Button";
import Loading from "@/components/basic/loading";
import AuthNav from "@/components/profile/auth_nav";

import { userPreferencesState } from "@/store/atoms/user-atom";
import { useAuth } from "@/context/authContext";
const page = () => {
const {isValid,isLoading}=useAuth();
useEffect(()=>{
  const token = sessionStorage?.getItem("token");

})


  return (
    <div className=" rounded-lg p-7 flex-1 h-[90%]">
      {isLoading && <Loading />}
      {isValid?.status ? (
        <>
          <Button url="my-profile/edit-profile" text="Edit profile" />

          <Header />
        </>
      ) : (
        <AuthNav text={isValid?.message} />
      )}
    </div>
  );
};

export default page;
