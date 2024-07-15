"use server"
import { signIn, signOut } from "@/auth"
import axios from "axios"
import { auth } from "@/auth"
import type { Session } from "next-auth"


 export const doSignIn= async (option:"google"|"github",route:string|null)=>{
await signIn(option,{redirectTo:route ? route :"/"})
}

export const doSignOut=async()=>{
  
    await signOut({redirectTo:"/"});
}
export const verifyGoogleAuthUser=async(s:Session)=>{
    
  const res = await axios.post(`${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/auth/google`,s);
//console.log(res.data, "returned from server to verifyGoogleAuthUse");
      return res.data 
}

export const getSession = async()=>{
return await auth();
}