"use client"
import React from "react";
import { Meet } from "@/components/webRTC/meet/meet";
import { useAuth } from "@/hooks/useAuth";

import AuthNav from "@/components/profile/auth_nav";
import Loading from "@/components/basic/loading";
const Page = () => {
 const {  isValid, isLoading } = useAuth();
   
  if(isLoading){
    return(
  <Loading/>
    )
  }
  return(
    <>

{isValid?.status ? <Meet/> : <AuthNav text={isValid?.message}/>}
    </>
  )
};
export default Page;
