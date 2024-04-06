import { SparklesCore } from "../components/ui/sparkles";
import { useTheme } from "@/lib/theme-provider";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import { LogOutIcon, UserCircle2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import * as ApiClient from "@/api-client";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export type RegisterFormData = {
  fullName: string;
  username: string;
  email: string;
  coverImage: FileList;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { theme } = useTheme();
  const [toggleBg, setToggleBg] = useState("#000000");
  const [toggleParticleColor, setToggleParColor] = useState("#ffffff");

  useEffect(() => {
    if (theme === "dark") {
      setToggleBg("#000000");
      setToggleParColor("#ffffff");
    } else {
      setToggleBg("#ffffff"); // Set to light theme background color
      setToggleParColor("#000000"); // Set to light theme particle color
    }
  }, [theme]);

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<RegisterFormData>();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ApiClient.register,
    onSuccess: () => {
      toast("Successfully Registered!!", {
        closeButton: true,
      });
      navigate("/");
    },
    onError: (errors) => {
      toast(`${errors.message}`, {
        closeButton: true,
      });
    },
  });

  const onSubmit = handleSubmit((data: RegisterFormData) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append(`coverImage`, data.coverImage[0]);
    mutation.mutate(formData);
  });

  return (
    <div className="bg-gray-400/10 mx-auto 2xl:max-w-screen-xl">
      <div className="h-full relative w-full flex flex-col justify-center overflow-hidden">
        <div className="w-full absolute inset-0 h-full">
          <SparklesCore
            id="tsparticlesfullpage"
            background={toggleBg}
            minSize={0.6}
            maxSize={1.4}
            particleDensity={80}
            className="w-full h-full"
            particleColor={toggleParticleColor}
          />
        </div>
        <div className="z-20 relative px-4 sm:px-12 lg:px-28 md:h-dvh 2xl:h-full xl:px-40 py-5 sm:py-10 flex flex-col justify-center">
          <div className=" flex flex-row">
            <div className=" w-full font-mono">
              <BackgroundGradient className="rounded-[22px] flex px-4 sm:px-6 lg:px-12 py-8 bg-white dark:bg-zinc-900">
                <form
                  encType="multipart/form-data"
                  className="flex flex-col gap-5 md:gap-0 md:flex-row w-full"
                  onSubmit={onSubmit}
                >
                  <div className="flex flex-col justify-center w-full items-center gap-2">
                    <Link to="/">
                      <LogOutIcon size={30} className="mb-5" />
                    </Link>
                    <h1 className="text-4xl font-bold">Register</h1>
                    <p className="lg:text-lg font-semibold text-center">
                      Want to explore projects or more
                    </p>
                    <div className=" dark:bg-cyan-950/10 rounded-full">
                      <UserCircle2Icon
                        strokeWidth={1}
                        color="#006d65"
                        className="h-28 w-28 sm:h-40 sm:w-40"
                      />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="mt-4 text-sm sm:text-base"
                      {...register("coverImage", {
                        required: "This field is required",
                      })}
                    />
                    {errors.coverImage && (
                      <span className="text-red-600 text-base">
                        {errors.coverImage.message}
                      </span>
                    )}
                  </div>

                  <div className="flex-col w-full flex gap-2 lg:gap-5 ">
                    <label className="flex flex-col gap-1">
                      <div className="flex-row">
                        <span className="font-bold text-sm sm:text-lg">
                          Full Name
                          <span className="text-red-600">*</span>
                        </span>
                        {errors.fullName && (
                          <span className="ml-5 text-red-600 text-xs sm:text-sm">
                            {errors.fullName.message}
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Enter your Full Name here"
                        className=" outline-0 border-2 text-xs sm:text-base dark:border-cyan-950 rounded-md px-2 py-1.5 dark:bg-black"
                        {...register("fullName", {
                          required: "This field is required",
                        })}
                      />
                    </label>

                    <label className="flex flex-col gap-1">
                      <div className="flex-row">
                        <span className="text-sm sm:text-lg font-bold">
                          Username
                          <span className=" text-red-600">*</span>
                        </span>
                        {errors.username && (
                          <span className="ml-5 text-red-600 text-xs">
                            {errors.username.message}
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Username must be less than 20 characters"
                        className=" outline-0 border-2 dark:border-cyan-950 rounded-md px-2 py-1.5 dark:bg-black text-xs lg:text-base"
                        {...register("username", {
                          validate: (username) => {
                            if (username.length > 20) {
                              return "Username with more than 20 characters are not allowed";
                            }
                            return true;
                          },
                        })}
                      />
                    </label>

                    <label className="flex flex-col gap-1">
                      <div className="flex-row">
                        <span className="text-sm sm:text-lg font-bold">
                          Email
                          <span className=" text-red-600">*</span>
                        </span>
                        {errors.email && (
                          <span className="ml-5 text-red-600 text-xs sm:text-sm">
                            {errors.email.message}
                          </span>
                        )}
                      </div>
                      <input
                        type="email"
                        placeholder="123example@gmail.com"
                        className="text-xs sm:text-base outline-0 border-2 dark:border-cyan-950 rounded-md px-2 py-1.5 dark:bg-black"
                        {...register("email", {
                          required: "This field is required",
                        })}
                      />
                    </label>

                    <label className="flex flex-col gap-1">
                      <div className="flex-row">
                        <span className="text-sm sm:text-lg font-bold">
                          Password<span className=" text-red-600">*</span>
                        </span>
                        {errors.password && (
                          <span className=" text-red-600 text-xs sm:text-sm ml-5">
                            {errors.password.message}
                          </span>
                        )}
                      </div>
                      <input
                        type="password"
                        placeholder="Password must be more than 8 characters"
                        className=" outline-0 border-2 dark:border-cyan-950 rounded-md px-2 py-1.5 dark:bg-black text-xs lg:text-base"
                        {...register("password", {
                          required: "This field is required",
                          minLength: {
                            value: 8,
                            message: "Password must be more than 8 characters",
                          },
                        })}
                      />
                    </label>

                    <label className="flex flex-col gap-1">
                      <div className="flex-row">
                        <span className=" text-sm sm:text-lg font-bold">
                          Confirm Password
                        </span>
                        {errors.confirmPassword && (
                          <span className=" text-red-600 text-xs sm:text-sm ml-5">
                            {errors.confirmPassword.message}
                          </span>
                        )}
                      </div>
                      <input
                        type="password"
                        placeholder="Password must be more than 8 characters"
                        className=" outline-0 border-2 dark:border-cyan-950 rounded-md px-2 py-1.5 dark:bg-black text-xs lg:text-base"
                        {...register("confirmPassword", {
                          validate: (confirmPassword) => {
                            if (confirmPassword !== watch("password"))
                              return "Password doesn't match";
                            else if (!confirmPassword)
                              return "This field is required";
                          },
                        })}
                      />
                    </label>

                    <Button
                      type="submit"
                      className=" text-lg md:text-xl dark:bg-black/50 dark:hover:bg-black dark:text-white  "
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? "Registering..." : "Register"}
                    </Button>

                    <span className="text-center">
                      Already have an account?
                      <Link to="/register">
                        <span className=" text-cyan-700 hover:text-cyan-800 underline cursor-pointer">
                          Login
                        </span>
                      </Link>
                    </span>
                  </div>
                </form>
              </BackgroundGradient>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
