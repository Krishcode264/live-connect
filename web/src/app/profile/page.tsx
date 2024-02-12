"use client";
import React from "react";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../store/selectors/user-selector";
import { useRouter } from "next/navigation";
import Profile from "../components/profile/user_profile";
import AuthNav from "../components/profile/auth_nav";
import { useValidateToken } from "../utils/hooks/validate_token";
import Loading from "../components/basic/loading";
const page = () => {
  const { isValid, isLoading } = useValidateToken();
if(isLoading){
  return(
    <Loading/>
  )
}
  return (
    <>{isValid.status ? <Profile /> : <AuthNav text={isValid.message} />}</>
  );
};

export default page;
