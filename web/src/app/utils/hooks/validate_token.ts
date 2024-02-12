"use client";
import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "@/app/store/atoms/user-atom";
import { useState } from "react";
export const useValidateToken = () => {
  console.log("usevalidate is running");
  const [user, setUser] = useRecoilState(userState);
  const [isValid, setIsValid] = useState({ status: false, message: "" });
 
  useEffect(() => {
     const token = localStorage.getItem("token");
    const validate = async () => {
      if (!token) {
        setIsValid(() => ({
          status: false,
          message: "you need to Authenticate...",
        }));
      }
      if (user.name) {
        setIsValid(() => ({ status: true, message: "" }));
      }
      if (!user.name && token) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/validateToken`,
          { token }
        );
        if (res.data?.name) {
          setUser((prev) => ({ ...prev, ...res.data }));
          console.log("got user in data user token is valid ");
          setIsValid(() => ({ status: true, message: "" }));
        } else {
          setIsValid(() => ({
            status: false,
            message: "Your token has expired , need login ",
          }));
        }
      }
    };
    validate();
  }, []);
  return isValid;
};
