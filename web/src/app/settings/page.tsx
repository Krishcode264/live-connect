"use client"
import { doSignOut } from '@/actions/authActions'
import React from 'react'
import useResetAllState from "@/hooks/useResetAllState"; 
import { useAuth } from '@/hooks/useAuth';
const Page = () => {

    const resetAllState = useResetAllState();
 const handleSignOut = () => {

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

export default Page