"use client"
import Link from "next/link";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import { IconBtn } from "@/components/basic/IconButton";
import React from "react";
import MainView from "@/components/homePage/MainView";
import { SessionProvider } from "next-auth/react";
export default function Hom() {
  return (
    <>
     
       
        <MainView />
      
      
    </>
  );
}
