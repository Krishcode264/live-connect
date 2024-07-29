"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import WorkspacesOutlinedIcon from "@mui/icons-material/WorkspacesOutlined";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { userBasicInfoState } from "@/store/atoms/user-atom";
import { useSetRecoilState } from "recoil";
import googleLogo from '../images/google.png'
import Image from "next/image";
import { doSignIn } from "@/actions/authActions";
import googlePic from "@/images/google.png";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
const SignUpSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(8),
});
type FormFields = z.infer<typeof SignUpSchema>;
const Signup = () => {
  const Router = useRouter();
  const setUser = useSetRecoilState(userBasicInfoState);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(SignUpSchema) });

const { isValid } = useAuth();
useEffect(() => {
  if (isValid?.status) redirect("/feed");
  console.log(isValid.status,"from sign up");
}, [isValid.status]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (process.env.NEXT_PUBLIC_SOCKET_SERVER_URL) {
      console.log(data);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/auth/signup`,
        data
      );
      if (res.data.status === "success") {
        // Set token in local storage with time limit
        const { token, name, id } = res.data.user;
        console.log(token, name, id);

        sessionStorage.setItem("token", token);
        setUser((prevUser) => ({
          ...prevUser,
          name: name,
          id: id,
        }));

  
        const preViousRoute=sessionStorage.getItem("privousRoute")
      if(preViousRoute){

        Router.replace(preViousRoute)
      }  else{
        Router.replace("/feed")
      }
      }
      
      if (res.data.status === "error") {
        setError("root", { message: res.data.message });
      }
    }
    }
 
  
  return (
    <div className="flex justify-center items-center h-full w-full ">
      <div className="  rounded-lg w-[80%]  md:w-[40%] mx-auto mt-4  p-3 py-4">
        <h4 className=" mx-auto text-center text-2xl text-slate-600 p-2">
          Create Account
        </h4>
        <form
          action=""
          className="flex flex-col rounded-lg gap-5 p-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register("name")}
            type="text"
            placeholder="Enter your name"
            className="p-2 rounded-lg text-xl bg-slate-200 text-slate-800"
          />
          {errors.name && <p className="text-red-300">{errors.name.message}</p>}
          <input
            {...register("email")}
            type="email"
            placeholder="Enter email"
            className="p-2 rounded-lg text-xl text-slate-800 bg-slate-200"
          />
          {errors.email && (
            <p className="text-red-400">{errors.email.message}</p>
          )}
          <input
            {...register("password")}
            type="password"
            placeholder="Enter password"
            className="p-2 rounded-lg text-xl text-slate-800 bg-slate-200"
          />
          {errors.password && (
            <p className="text-red-400 ">{errors.password.message}</p>
          )}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() =>
              doSignIn("google", window.sessionStorage.getItem("privousRoute"))
            }
            className="p-2 hover:bg-blue-200 rounded-xl text-xl bg-blue-100 text-slate-500 font-medium flex items-center justify-center gap-2"
          >
            <p>sign up with </p>
            <Image src={googlePic} className="w-24 mt-2" alt="google" />
          </button>
          <button
            disabled={isSubmitting}
            className="p-2 rounded-xl text-slate-200  bg-blue-600 font-medium "
          >
            Create Account
            {isSubmitting && (
              <WorkspacesOutlinedIcon className="animate-spin" />
            )}
          </button>

          {errors.root && (
            <p className="text-red-400  ">{errors.root.message}</p>
          )}
          <p className="text-slate-900">
            Alredy have account?
            <Link
              href="/login"
              className="text-blue-500  ml-1 hover:text-blue-700 "
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
