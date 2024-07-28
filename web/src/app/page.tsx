"use client"
import Link from "next/link";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import { IconBtn } from "@/components/basic/IconButton";
import React from "react";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  redirect("/feed")
  return (
    <>
     
    </>
  );
}
