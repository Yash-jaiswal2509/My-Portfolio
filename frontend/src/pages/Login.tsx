import { SparklesCore } from "../components/ui/sparkles";
import { useTheme } from "@/lib/theme-provider";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as ApiClient from "../api-client";

export type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { theme } = useTheme();
  let toggleBg = "#FFF";
  let toggleParColor = "#000";
  if (theme === "dark") {
    toggleParColor = "#FFF";
    toggleBg = "#020817";
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<LoginFormData>();

  const mutation = useMutation({
    mutationFn: ApiClient.login,
    onSettled: () => {
      reset;
    },
  });

  const onSubmit = handleSubmit((data: LoginFormData) => {
    mutation.mutate(data);
  });

  return (
    <div className="2xl:h-[760px] h-screen bg-gray-400/10 mx-auto 2xl:max-w-screen-2xl">
      <div className="h-full relative w-full flex flex-col justify-center overflow-hidden rounded-xl">
        <div className="w-full absolute inset-0 h-full">
          <SparklesCore
            id="tsparticlesfullpage"
            background={toggleBg}
            minSize={0.6}
            maxSize={1.4}
            particleDensity={80}
            className="w-full h-full"
            particleColor={toggleParColor}
          />
        </div>
        <div className="z-20 relative px-4 sm:px-20 md:px-40 py-10 flex flex-col">
          <div className=" flex flex-row">
            <div className=" w-full font-mono">
              <BackgroundGradient className="rounded-[22px] flex flex-col gap-4 items-center px-4 sm:px-12 py-8 bg-white dark:bg-zinc-900">
                <Link to="/">
                  <LogOutIcon size={30} className="mb-5" />
                </Link>
                <h1 className="text-4xl font-bold">Login</h1>
                <p className="text-xs sm:text-lg font-semibold">
                  Login to explore the projects...
                </p>
                <form
                  className="flex-col flex gap-5 w-full"
                  onSubmit={onSubmit}
                >
                  <label className="flex flex-col gap-1">
                    <span className=" text-lg font-bold">
                      Email<span className=" text-red-600">*</span>
                    </span>
                    <input
                      type="email"
                      placeholder="example123@gmail.com"
                      className=" outline-0 border-2 rounded-md p-2 dark:bg-black"
                      {...register("email", {
                        required: "Email field is empty",
                      })}
                    />
                    {errors.email && (
                      <span className="text-red-600 text-base">
                        {errors.email.message}
                      </span>
                    )}
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className=" text-lg font-bold">
                      Password<span className=" text-red-600">*</span>
                    </span>
                    <input
                      type="password"
                      placeholder="Enter your Password here"
                      className=" outline-0 border-2 rounded-md p-2 dark:bg-black"
                      {...register("password", {
                        required: "Password field is empty",
                      })}
                    />
                    <span className=" w-full text-right underline text-cyan-700 hover:text-cyan-800 pr-2 cursor-pointer">
                      Forgot password?
                    </span>
                    {errors.password && (
                      <span className="text-red-600 text-base">
                        {errors.password.message}
                      </span>
                    )}
                  </label>
                  <Button
                    type="submit"
                    className=" text-xl dark:bg-black/50 dark:hover:bg-black dark:text-white"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Loggin In..." : "Log in"}
                  </Button>
                </form>
                <span className=" text-sm flex flex-col items-center  sm:flex-row sm:gap-2">
                  Don't have an account?
                  <Link to="/register">
                    <span className=" text-cyan-700 hover:text-cyan-800 underline cursor-pointer">
                      Create Account
                    </span>{" "}
                  </Link>
                </span>
              </BackgroundGradient>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
