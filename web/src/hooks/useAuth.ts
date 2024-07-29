"use client"
import { verifyGoogleAuthUser } from "@/actions/authActions";
import { userBasicInfoState } from "@/store/atoms/user-atom";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export const useAuth = () => {
  const [isValid, setIsValid] = useState({ status: false, message: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useRecoilState(userBasicInfoState);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    const validate = async () => {
      try {
        const s = await getSession();
        if (s?.user?.email) {
          const { status, message, user } = await verifyGoogleAuthUser(s);
          console.log("with google ias running",status,message);
          setIsValid(()=>({ status, message }));
          setUser((prev) => ({ ...prev, ...user }));
        } else if (token) {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/validateToken`,
            { token }
          );
          if (res.data?.name) {
            setUser((prev) => ({ ...prev, ...res.data }));
            setIsValid({ status: true, message: "" });
            console.log("status is true here ");
          } else {
            setIsValid({
              status: false,
              message: "Your token has expired, need login ",
            });
            console.log("status is false  here ");
          }
        } else {
          setIsValid({
            status: false,
            message: "You need to authenticate...",
          });
          console.log(" we dont hav etoken nor google auth ");
        }
      } catch (error) {
        setIsValid({
          status: false,
          message: "An error occurred during validation.",
        });
        console.log("something wen wrong in useauth", error);
      } finally {
        setIsLoading(false);
      }
    };

    validate();
  }, []);
  return { isValid, isLoading, user };
};
