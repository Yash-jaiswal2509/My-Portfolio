import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as ApiClient from "../api-client";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/AuthProvider";

export type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { setIsLoggedIn, setAuth } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>();

  const mutation = useMutation({
    mutationFn: ApiClient.login,
  });

  const onSubmit = handleSubmit((data: LoginFormData) => {
    mutation.mutate(data);
  });

  useEffect(() => {
    if (mutation.data?.data.success) {
      setIsLoggedIn(true);
      setAuth(mutation.data?.data.data);
      console.log(mutation.data?.data.data);
      navigate(from, { replace: true });
      toast.message("Successfully Logged In", { closeButton: true });
    }
  }, [mutation.isSuccess]);

  return (
    <div className="2xl:h-[760px] h-screen mx-auto 2xl:max-w-screen-2xl w-full dark:bg-background bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
      <div className="h-full relative w-full flex flex-col justify-center overflow-hidden rounded-xl">
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
                    </span>
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
