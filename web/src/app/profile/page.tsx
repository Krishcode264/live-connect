"use client";
import React from "react";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../store/selectors/user-selector";
import { useRouter } from "next/navigation";
import Profile from "../components/profile/user_profile";
import AuthNav from "../components/profile/auth_nav";
const page = () => {
  
  const { name, id } = useRecoilValue(userInfoState);




  return <>{id ? <Profile /> : <AuthNav/>}</>;
};

export default page;
