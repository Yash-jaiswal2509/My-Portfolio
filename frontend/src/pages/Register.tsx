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

export type RegisterFromData = {
  fullName: string;
  username: string;
  email: string;
  coverImage: FileList;
  password: string;
  confirmPassword: string;
};

const Register = () => {
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
    watch,
    handleSubmit,
    // reset,
  } = useForm<RegisterFromData>();
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

  const onSubmit = handleSubmit((data: RegisterFromData) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append(`coverImage`, data.coverImage[0], "userImage");
    mutation.mutate(formData);
  });

  return (
    <div className="2xl:h-[760px] h-screen bg-gray-400/10 mx-auto 2xl:max-w-screen-2xl">
      <div className="h-full relative w-full flex flex-col justify-center overflow-hidden rounded-xl border-4 border-gray-100 dark:border-gray-800">
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
        <div className="z-20 relative px-40 py-10 flex flex-col">
          <div className=" flex flex-row">
            <div className=" w-full font-mono">
              <BackgroundGradient className="rounded-[22px] flex px-12 py-8 bg-white dark:bg-zinc-900">
                <form
                  encType="multipart/form-data"
                  className="flex w-full"
                  onSubmit={onSubmit}
                >
                  <div className="flex flex-col w-full items-center gap-2">
                    <Link to="/">
                      <LogOutIcon size={30} className="mb-5" />
                    </Link>
                    <h1 className="text-4xl font-bold">Register</h1>
                    <p className="text-lg font-semibold">
                      Want to explore projects or more
                    </p>
                    <p className="text-lg font-semibold">Register Now</p>
                    <div className=" dark:bg-cyan-950/10 rounded-full">
                      <UserCircle2Icon
                        size={150}
                        strokeWidth={1}
                        color="#006d65"
                      />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="mt-4"
                      {...register("coverImage", {
                        required: "This field is required",
                      })}
                    />
                    {errors.coverImage && (
                      <span className="text-red-600 text-md">
                        {errors.coverImage.message}
                      </span>
                    )}
                  </div>

                  {/*  */}

                  <div className="flex-col w-full flex gap-5 ">
                    <label className="flex flex-col gap-1">
                      <div className="flex-row">
                        <span className="font-bold text-lg">
                          Full Name
                          <span className="text-red-600">*</span>
                        </span>
                        {errors.fullName && (
                          <span className="ml-5 text-red-600 text-sm">
                            {errors.fullName.message}
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Enter your Full Name here"
                        className=" outline-0 border-2 dark:border-cyan-950 rounded-md px-2 py-1.5 dark:bg-black"
                        {...register("fullName", {
                          required: "This field is required",
                        })}
                      />
                    </label>

                    <label className="flex flex-col gap-1">
                      <div className="flex-row">
                        <span className=" text-lg font-bold">
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
                        className=" outline-0 border-2 dark:border-cyan-950 rounded-md px-2 py-1.5 dark:bg-black"
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
                        <span className=" text-lg font-bold">
                          Email
                          <span className=" text-red-600">*</span>
                        </span>
                        {errors.email && (
                          <span className="ml-5 text-red-600 text-sm">
                            {errors.email.message}
                          </span>
                        )}
                      </div>
                      <input
                        type="email"
                        placeholder="123example@gmail.com"
                        className=" outline-0 border-2 dark:border-cyan-950 rounded-md px-2 py-1.5 dark:bg-black"
                        {...register("email", {
                          required: "This field is required",
                        })}
                      />
                    </label>

                    <label className="flex flex-col gap-1">
                      <div className="flex-row">
                        <span className=" text-lg font-bold">
                          Password<span className=" text-red-600">*</span>
                        </span>
                        {errors.password && (
                          <span className=" text-red-600 text-sm ml-5">
                            {errors.password.message}
                          </span>
                        )}
                      </div>
                      <input
                        type="password"
                        placeholder="Password must be more than 8 characters"
                        className=" outline-0 border-2 dark:border-cyan-950 rounded-md px-2 py-1.5 dark:bg-black"
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
                        <span className=" text-lg font-bold">
                          Confirm Password
                        </span>
                        {errors.confirmPassword && (
                          <span className=" text-red-600 text-sm ml-5">
                            {errors.confirmPassword.message}
                          </span>
                        )}
                      </div>
                      <input
                        type="password"
                        placeholder="Password must be more than 8 characters"
                        className=" outline-0 border-2 dark:border-cyan-950 rounded-md px-2 py-1.5 dark:bg-black"
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
                      className=" text-xl dark:bg-black/50 dark:hover:bg-black dark:text-white  "
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? "Registering..." : "Register"}
                    </Button>

                    <span className="text-center">
                      Already have an account?{" "}
                      <Link to="/register">
                        <span className=" text-cyan-700 hover:text-cyan-800 underline cursor-pointer">
                          Login
                        </span>{" "}
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
