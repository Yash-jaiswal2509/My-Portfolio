import TechStack from "./TechStack";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export type ProjectType = {
  _id: string;
  title: string;
  shortDescription: string;
  projectImages: string[];
};

const Projects = () => {
  const apiURL = import.meta.env.VITE_API_URL as string;
  const navigate = useNavigate();
  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/v1/projects`, {
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

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <TechStack />
      <div className="flex flex-col p-2 sm:p-5 ">
        {isFetching ? (
          <div className="px-1 py-4 sm:py-0 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((index) => {
              return (
                <div
                  key={index}
                  className="p-2 sm:p-4 flex flex-col gap-2 bg-gray-400/10 dark:bg-gray-900/40 rounded-md sm:rounded-xl shadow-md dark:shadow-white/20"
                >
                  <Skeleton className="w-full h-52" />
                  <Skeleton className="w-full h-10" />
                  <Skeleton className="w-full h-10" />
                  <Skeleton className="w-full h-10" />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="px-1 py-4 sm:py-0 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            {ProjectsData.data.map((project: ProjectType, index: number) => {
              return (
                <div
                  key={index}
                  className="p-2 sm:p-4 flex flex-col gap-2 bg-gray-400/10 dark:bg-gray-900/15 rounded-md sm:rounded-xl shadow-md dark:shadow-white/20 border-2 border-white/10"
                >
                  <Carousel
                    className="shadow-lg dark:shadow-white/20 rounded-md sm:rounded-xl overflow-hidden"
                    plugins={[
                      Autoplay({
                        delay: 4000,
                      }),
                    ]}
                  >
                    <CarouselContent>
                      {project.projectImages.map(
                        (image: string, index: number) => (
                          <CarouselItem key={index}>
                            <img src={image} className=" h-56 w-full " />
                          </CarouselItem>
                        )
                      )}
                    </CarouselContent>
                  </Carousel>
                  <h1 className="text-lg lg:text-2xl px-2 sm:px-4 font-semibold mt-4">
                    {project.title}
                  </h1>
                  <p className="italic mt-auto text-sm px-2 sm:px-4 text-justify">
                    {project.shortDescription}
                  </p>
                  <Button
                    variant="outline"
                    className="mx-2 mt-3 text-sm lg:text-lg font-semibold hover:underline"
                    onClick={() => navigate(`/projects/${project._id}`)}
                  >
                    View More
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
