
"use client"
import React, { useEffect } from "react";
import { Meet } from "../components/webRTC/meet/meet";
import { useValidateToken } from "../utils/hooks/validate_token";
import { isValid } from "zod";
import AuthNav from "../components/profile/auth_nav";
const Page = () => {
  const isValid=useValidateToken()
     console.log(isValid)
  return(
    <>
{isValid.status ? <Meet/> : <AuthNav text={isValid.message}/>}
    </>
  )
};
export default Page;
