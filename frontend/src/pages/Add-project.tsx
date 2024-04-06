import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import * as ApiClient from "../api-client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export type ProjectFormData = {
  title: string;
  description: string;
  projectImages: FileList;
};

const AddProject = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ProjectFormData>();

  const mutation = useMutation({
    mutationFn: ApiClient.addProject,
    onSuccess: () => {
      toast("Successfully Added Project!!", {
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

  const onSubmit = handleSubmit((data: ProjectFormData) => {
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("description", data.description);
    if (data.projectImages.length !== 0) {
      for (let index = 0; index < data.projectImages.length; index++) {
        formdata.append(
          "projectImages",
          data.projectImages[index],
          "projectImages"
        );
      }
    }
    console.log(formdata);
    mutation.mutate(formdata);
  });

  return (
    <div className="p-10 w-full">
      <form
        className="bg-gray-400/10 dark:bg-gray-900/70 p-10 flex flex-col gap-4 rounded-xl"
        onSubmit={onSubmit}
      >
        <label className="flex flex-col gap-2">
          <div className="flex-row">
            <span className="font-bold text-3xl">
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
            <span className="font-bold text-3xl">
              Description
              <span className="text-red-600">*</span>
            </span>
            {errors.description && (
              <span className="ml-5 text-red-600 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>
          <input
            type="text"
            placeholder="Enter the description"
            className=" outline-0 border-2 dark:border-cyan-950 rounded-md p-4 dark:bg-gray-950/80"
            {...register("description", {
              required: "This field is required",
            })}
          />
        </label>
        <label className="flex flex-col gap-2">
          <div className="flex-row">
            <span className="font-bold text-3xl">
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
