"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { z } from "zod";
import axios from "axios";
import { userBasicInfoState } from "@/store/atoms/user-atom";
import Link from "next/link";
import WorkspacesOutlinedIcon from "@mui/icons-material/WorkspacesOutlined";
import { useSession, signIn, signOut } from "next-auth/react";
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof LoginSchema>;

const Login = () => {
 const Router=useRouter()
  const setUser = useSetRecoilState(userBasicInfoState);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(LoginSchema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    
    if (process.env.NEXT_PUBLIC_SOCKET_SERVER_URL) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/auth/login`,
        data
      );
      if (res.data.status === "success") {
        const { token, name, id } = res.data.user;
        sessionStorage.setItem("token", token);
        setUser((prevUser) => ({
          ...prevUser,
          name: name,
          id: id,
        }));
          
        Router.back();
      
      }
      if (res.data.status === "error") {
        setError("root", { message: res.data.message });
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full ">
      
      <div className="rounded-lg  w-[80%] md:w-[40%] mx-auto mt-4 p-3 py-4   ">
        <h4 className="mx-auto text-center text-2xl text-slate-900 p-2">
         Sign in 
        </h4>
        <form
          action=""
          className="flex flex-col rounded-lg gap-5 p-2  "
          onSubmit={handleSubmit(onSubmit)}
        >
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
            disabled={isSubmitting}
            className="p-2 rounded-xl  text-slate-200 bg-blue-400 font-medium "
          >
            Login
            {isSubmitting && (
              <WorkspacesOutlinedIcon className="animate-spin" />
            )}
          </button>
          <button
            disabled={isSubmitting}
            onClick={()=>signIn()}
            className="p-2 rounded-xl bg-blue-400 text-slate-200 font-medium"
          >
            Login with Google
          </button>
          {errors.root && (
            <p className="text-red-400 ">{errors.root.message}</p>
          )}
          <p className="text-slate-900">
            Dont have an account?
            <Link
              href="/signup"
              className="text-blue-400  ml-1 hover:text-blue-500 "
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;