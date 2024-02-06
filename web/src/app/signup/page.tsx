"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import WorkspacesOutlinedIcon from "@mui/icons-material/WorkspacesOutlined";
import axios from "axios";
const SignUpSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(8),
});
type FormFields = z.infer<typeof SignUpSchema>;
const Signup = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(SignUpSchema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (process.env.NEXT_PUBLIC_SOCKET_SERVER_URL) {
      console.log(data);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}/signup`,
        data
      );
      if (res.data.status == "error") {
        setError("root", {message:res.data.message});
      }
    }
  };
  return (
    <div className="flex justify-center items-center h-full w-full ">
      <div className="  rounded-lg w-[80%] mb:w-[60%] md:w-[30%] mx-auto mt-4  p-3 bg-gradient-to-r  from-blue-400  via-sky-900 to-sky-950 ">
        <h4 className=" mx-auto text-center text-2xl text-slate-300 p-2">
          Create Account
        </h4>
        <form
          action=""
          className="flex flex-col rounded-lg gap-2 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register("name")}
            type="text"
            placeholder="Enter your name"
            className="p-2 rounded-lg text-xl bg-slate-800 text-slate-300"
          />
          {errors.name && <p className="text-red-300">{errors.name.message}</p>}
          <input
            {...register("email")}
            type="email"
            placeholder="Enter email"
            className="p-2 rounded-lg text-xl text-slate-300 bg-slate-800"
          />
          {errors.email && (
            <p className="text-red-400">{errors.email.message}</p>
          )}
          <input
            {...register("password")}
            type="password"
            placeholder="Enter password"
            className="p-2 rounded-lg text-xl text-slate-300 bg-slate-800"
          />
          {errors.password && (
            <p className="text-red-400 ">{errors.password.message}</p>
          )}
          <button
            disabled={isSubmitting}
            className="p-2 rounded-xl text-slate-300 shadow-lg hover:shadow-sky-500 "
          >
            Create Account
            {isSubmitting && (
              <WorkspacesOutlinedIcon className="animate-spin" />
            )}
          </button>
          <button className="p-2 rounded-xl text-slate-300 shadow-md hover:shadow-sky-500 ">
            Sign up with Google
          </button>
          {errors.root && (
            <p className="text-red-400 ">{errors.root.message}</p>
          )}
          <p className="text-slate-900">
            Alredy have account?
            <Link
              href="/signin"
              className="text-blue-400  ml-1 hover:text-blue-500 "
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
