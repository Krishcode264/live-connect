"use client"
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import {
  userBasicInfoState,
  type UserBasicInfo,
} from "@/store/atoms/user-atom";
import { doSignOut, getSession, verifyGoogleAuthUser } from "@/actions/authActions";
import type { User } from "@/types/types";
import useResetAllState from "@/hooks/useResetAllState";

interface AuthContextType {
  isValid: { status: boolean; message: string };
  isLoading: boolean;
  setIsValid: (v: { status: boolean; message: string }) => void;
  user?: UserBasicInfo;
}
const AuthContext = createContext< AuthContextType|null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useRecoilState(userBasicInfoState);
  const [isValid, setIsValid] = useState({ status: false, message: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    const validate = async () => {
      try {
                            
        const s = await getSession();
        if (s?.user?.email) {
          const { status, message, user } = await verifyGoogleAuthUser(s);

          setIsValid({ status, message });
          setUser((prev) => ({ ...prev, ...user }));
        } else if (token) {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/validateToken`,
            { token }
          );
          if (res.data?.name) {
            setUser((prev) => ({ ...prev, ...res.data }));
            setIsValid({ status: true, message: "" });

          } else {
            setIsValid({
              status: false,
              message: "Your token has expired, need login ",
            });
        
          }
        } else {
          setIsValid({ status: false, message: "You need to authenticate..." });
             
        }
      } catch (error) {

        setIsValid({
          status: false,
          message: "An error occurred during validation.",
        });
            
      } finally {
        setIsLoading(false);
      }
    };

    validate();
  }, []);

 
  
  return (
    <AuthContext.Provider value={{ user, isValid, setIsValid,isLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log(context)
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
