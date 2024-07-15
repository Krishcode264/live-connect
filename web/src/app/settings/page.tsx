"use client"
import { doSignOut } from '@/actions/authActions'
import React from 'react'
import useResetAllState from "@/hooks/useResetAllState"; 
import { useAuth } from '@/context/authContext';
const page = () => {
 const {setIsValid}=useAuth()
    const resetAllState = useResetAllState();
 const handleSignOut = () => {
setIsValid({status:false,message:"you are looged out"})
   window.sessionStorage.clear();
   resetAllState();
   doSignOut();
 };

  return (
    <div>
      settings page
      <form action={handleSignOut}>
        <button type="submit">sign out</button>
      </form>
    </div>
  );
}

export default page