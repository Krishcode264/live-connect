"use client"
import React, { useEffect, useState } from "react";
import Header from "@/components/my-profile/Header";

import { Button } from "@/components/basic/Button";
import Loading from "@/components/basic/loading";
import AuthNav from "@/components/profile/auth_nav";

import { userBasicInfoState, userPreferencesState } from "@/store/atoms/user-atom";
import { useAuth } from "@/hooks/useAuth";
import { verifyGoogleAuthUser } from "@/actions/authActions";
import axios from "axios";
import { getSession } from "next-auth/react";
import { isValid } from "zod";
import { useRecoilState } from "recoil";
const Page = () => {
const {isLoading,isValid,user}=useAuth()



  return (
    <div className=" rounded-lg p-7 flex-1 h-[90%]">
      {isLoading && <Loading />}
      { isLoading === false && isValid?.status ? (
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

export default Page;
