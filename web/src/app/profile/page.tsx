"use client"

import React from "react";
import Profile from "../components/profile/user_profile";
import AuthNav from "../components/profile/auth_nav";
import { useValidateToken } from "../utils/hooks/validate_token";
import Loading from "../components/basic/loading";

const ProfilePage = () => {
  const { isValid, isLoading } = useValidateToken();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
    {isValid.status ? <Profile /> : <AuthNav text={isValid.message} />}</>
  );
};

export default ProfilePage;
