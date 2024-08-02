"use client"
import React from "react";
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
    <h1>
paGHE
{/* {isValid?.status ? <Meet/> : <AuthNav text={isValid?.message}/>} */}
    </h1>
  )
};
export default Page;
