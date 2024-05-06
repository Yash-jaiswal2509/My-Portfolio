import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { axiosPrivate } from "@/lib/axiosPrivate";
import { useAuth } from "@/lib/AuthProvider";
import { useEffect } from "react";
import axios from "axios";

export type ProjectFormData = {
  title: string;
  shortDescription: string;
  longDescription: string;
  deploymentLink: string;
  githubLink: string;
  featured?: boolean;
  projectImages: FileList;
};

const AddProject = () => {
  const { auth } = useAuth();
  const apiURL = import.meta.env.VITE_API_URL as string;
  const navigate = useNavigate();

  const token = auth?.accessToken;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ProjectFormData>();

  const addProject = async (formData: FormData) => {
    try {
      const response = await axios
        .post(`${apiURL}/api/v1/admin/add-project`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => console.log(res.data))
        .catch((error: Error) => console.error(error));

      return response;
    } catch (error) {
      console.error(error);
      throw new Error("Something went wrong while adding project");
    }
  };

  const mutation = useMutation({
    mutationFn: addProject,
  });

  const onSubmit = handleSubmit((data: ProjectFormData) => {
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("shortDescription", data.shortDescription);
    formdata.append("longDescription", data.longDescription);
    formdata.append("deploymentLink", data.deploymentLink);
    formdata.append("githubLink", data.githubLink);
    formdata.append("featured", data.featured?.toString() || "false");

    if (data.projectImages.length !== 0) {
      for (let index = 0; index < data.projectImages.length; index++) {
        formdata.append(
          "projectImages",
          data.projectImages[index],
          "projectImages"
        );
      }
    }
    mutation.mutate(formdata);
  });

  useEffect(() => {
    if (!auth) {
      navigate("/unauthorized");
    }

    if (mutation.data) {
      toast("Successfully Added Project!!", {
        closeButton: true,
      });
      navigate("/admin");
    }

    if (mutation.isError) {
      toast(`${mutation.error?.message}`, {
        closeButton: true,
      });
    }
  }, [auth, mutation.isSuccess, token, mutation.isError]);

  return (
    <div className="p-10 w-full">
      <h1 className=" font-semibold text-3xl text-center mb-5">
        Add Project Form
      </h1>
      <form
        className="bg-gray-400/10 dark:bg-gray-900/70 p-10 flex flex-col gap-4 rounded-xl"
        onSubmit={onSubmit}
      >
        <label className="flex flex-col gap-2">
          <div className="flex-row">
            <span className="font-bold text-xl">
              Title
              <span className="text-red-600">*</span>
            </span>
            {errors.title && (
              <span className="ml-5 text-red-600 text-sm">
                {errors.title.message}
              </span>
            )}
          </div>
          <input
            type="text"
            placeholder="Enter the title"
            className=" outline-0 border-2 dark:border-cyan-950 rounded-md p-4 dark:bg-gray-950/80"
            {...register("title", {
              required: "This field is required",
            })}
          />
        </label>

        <label className="flex flex-col gap-2">
          <div className="flex-row">
            <span className="font-bold text-xl">
              Short Description
              <span className="text-red-600">*</span>
            </span>
            {errors.shortDescription && (
              <span className="ml-5 text-red-600 text-sm">
                {errors.shortDescription.message}
              </span>
            )}
          </div>
          <textarea
            placeholder="Enter the description"
            className=" outline-0 border-2 dark:border-cyan-950 rounded-md p-4 dark:bg-gray-950/80 resize-none h-28"
            {...register("shortDescription", {
              required: "This field is required",
            })}
          />
        </label>

        <label className="flex flex-col gap-2">
          <div className="flex-row">
            <span className="font-bold text-xl">
              Long Description
              <span className="text-red-600">*</span>
            </span>
            {errors.longDescription && (
              <span className="ml-5 text-red-600 text-sm">
                {errors.longDescription.message}
              </span>
            )}
          </div>
          <textarea
            placeholder="Enter the description"
            className=" outline-0 border-2 dark:border-cyan-950 rounded-md p-4 dark:bg-gray-950/80 resize-none h-40"
            {...register("longDescription", {
              required: "This field is required",
            })}
          />
        </label>

        <label className="flex flex-col gap-2">
          <div className="flex-row">
            <span className="font-bold text-xl">Deployment Link</span>
            {errors.deploymentLink && (
              <span className="ml-5 text-red-600 text-sm">
                {errors.deploymentLink.message}
              </span>
            )}
          </div>
          <input
            type="text"
            placeholder="Enter the deployment link"
            className=" outline-0 border-2 dark:border-cyan-950 rounded-md p-4 dark:bg-gray-950/80"
            {...register("deploymentLink")}
          />
        </label>

        <label className="flex flex-col gap-2">
          <div className="flex-row">
            <span className="font-bold text-xl">Github Link</span>
            {errors.githubLink && (
              <span className="ml-5 text-red-600 text-sm">
                {errors.githubLink.message}
              </span>
            )}
          </div>
          <input
            type="text"
            placeholder="Enter the github link"
            className=" outline-0 border-2 dark:border-cyan-950 rounded-md p-4 dark:bg-gray-950/80"
            {...register("githubLink")}
          />
        </label>

        <label className="flex gap-2">
          <div className="flex-row">
            <span className="font-bold text-xl">Featured</span>
            {errors.featured && (
              <span className="ml-5 text-red-600 text-sm">
                {errors.featured.message}
              </span>
            )}
          </div>
          <input
            type="checkbox"
            className="outline-0 border-2 dark:border-cyan-950 rounded-md p-4 dark:bg-gray-950/80"
            {...register("featured")}
          />
        </label>

        <label className="flex flex-col gap-2">
          <div className="flex-row">
            <span className="font-bold text-xl">
              Project Images
              <span className="text-red-600">*</span>
            </span>
            {errors.projectImages && (
              <span className="ml-5 text-red-600 text-sm">
                {errors.projectImages.message}
              </span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            className=" outline-0 border-2 dark:border-cyan-950 rounded-md p-4 dark:bg-gray-950/80"
            {...register("projectImages", {
              required: "This field is required",
            })}
          />
        </label>

        <Button
          type="submit"
          className="text-xl dark:bg-black/50 dark:hover:bg-black dark:text-white"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Submiting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default AddProject;
