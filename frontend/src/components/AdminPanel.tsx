import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PlusCircle, X } from "lucide-react";
import { Button } from "./ui/button";

const AdminPanel = () => {
  const apiURL = import.meta.env.VITE_API_URL;
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const response = await axiosPrivate.get(`${apiURL}/api/v1/projects`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Unexpected response status: " + response.status);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw new Error("Failed to fetch projects. Please try again later.");
    }
  };

  const { data: ProjectsData, isFetching } = useQuery({
    queryKey: ["fetchProjects"],
    queryFn: fetchProjects,
  });
  const projects = ProjectsData?.data || [];

  projects.reverse();

  return (
    <div className=" w-full py-6 px-4">
      <h1 className=" m-auto text-center font-bold text-2xl">
        List Of The Projects
      </h1>
      <div className="my-5">
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <ul className="bg-gray-400/10 dark:bg-gray-900/30 rounded-xl font-semibold shadow-md dark:shadow-white/20 p-5">
            {projects.map((project: any) => (
              <li
                key={project._id}
                className="border rounded-md p-2 border-gray-50 my-5 grid grid-cols-list w-full bg-gray-400/10 dark:bg-gray-900/60 font-semibold shadow-md dark:shadow-white/20"
              >
                <img
                  src={project.projectImages[0]}
                  alt={project.title}
                  className=" h-full w-full rounded-md object-cover"
                />
                <h1 className="m-auto p-2">{project.title}</h1>
                <span className="m-auto text-justify">{project.shortDescription}</span>
                <X className="w-8 h-6 m-auto cursor-pointer" />
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button
        onClick={() => navigate("/admin/add-project")}
        className=" w-full font-bold text-lg"
        variant={"outline"}
      >
        Add Project <PlusCircle className="h-8 ml-2" />
      </Button>
    </div>
  );
};

export default AdminPanel;
