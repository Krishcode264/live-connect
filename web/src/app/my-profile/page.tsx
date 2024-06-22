"use client"
import React, { useEffect } from "react";
import Header from "@/components/my-profile/Header";
import Link from "next/link";
import { Button } from "@/components/basic/Button";
import { useValidateToken } from "../../utils/hooks/validate_token";
import Loading from "@/components/basic/loading";
import AuthNav from "@/components/profile/auth_nav";
import { useFetchAndStore } from "@/utils/hooks/fetch_store";
import { userPreferencesState } from "@/store/atoms/user-atom";

const page = () => {
  const { isValid, isLoading } = useValidateToken();
  const token=sessionStorage.getItem("token")
  if(token && isValid ){
useFetchAndStore("/userPreferencesState", userPreferencesState, [], token);
  }

  return (
    <div className=" rounded-lg p-7 flex-1 h-[90%]">
      {isLoading && <Loading />}
      {isValid.status ? (
        <>
          <Button url="my-profile/edit-profile" text="Edit profile" />

          <Header />
        </>
      ) : (
        <AuthNav text={isValid.message} />
      )}
    </div>
  );
};

export default page;
