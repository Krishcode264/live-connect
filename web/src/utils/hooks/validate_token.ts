"use client";
import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userBasicInfoState } from "@/store/atoms/user-atom";
import { useState } from "react";
export const useValidateToken = () => {
  console.log("usevalidate is running");
  const [user, setUser] = useRecoilState(userBasicInfoState);
  const [isValid, setIsValid] = useState({ status: false, message: "" });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = sessionStorage.getItem("token"); // Use sessionStorage instead of localStorage
    const validate = async () => {
      if (!token) {
        setIsValid(() => ({
          status: false,
          message: "you need to Authenticate...",
        }));
        setIsLoading(false);
      }
      if (user.name) {
        setIsValid(() => ({ status: true, message: "" }));
        setIsLoading(false);
      }
      if (!user.name && token) {
        console.log(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL, "env variable from frontend ");
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/validateToken`,
          { token }
        );
        if (res.data?.name) {
          setUser((prev) => ({ ...prev, ...res.data }));
          console.log("got user in data user token is valid ");
          setIsValid(() => ({ status: true, message: "" }));
          setIsLoading(false);
        } else {
          setIsValid(() => ({
            status: false,
            message: "Your token has expired, need login ",
          }));
          setIsLoading(false);
        }
      }
    };
    validate();
  }, []);
  return { isValid, isLoading };
};
