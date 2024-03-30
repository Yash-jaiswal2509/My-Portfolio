import { PlusCircle } from "lucide-react";
import TechStack from "./TechStack";
import { Button } from "./ui/button";
import { useAuth } from "../lib/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as ApiClient from "../api-client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "@/components/ui/skeleton";


export type ProjectType = {
  title: string;
  description: string;
  projectImages: string[];
};

const Projects = () => {
  const { isAdmin } = useAuth();

  const navigate = useNavigate();

  const {
    data: ProjectsData,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["fetchProjects"],
    queryFn: ApiClient.fetchProjects,
    retry: false,
  });

  if (isError) {
    throw new Error("Something went wrong while fetching projects");
  }

  return (
    <div className="overflow-hidden flex flex-col w-fit">
      <TechStack />
      <div className=" flex flex-col p-2 sm:p-5 ">
        {isAdmin ? (
          <Button
            variant="secondary"
            className=" text-lg font-bold mb-4"
            onClick={() => navigate("/add-project")}
          >
            Add Project <PlusCircle className="ml-2" />
          </Button>
        ) : (
          <></>
        )}

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
            {ProjectsData?.data.data.map(
              (project: ProjectType, index: number) => {
                return (
                  <div
                    key={index}
                    className="p-2 sm:p-4 flex flex-col gap-2 bg-gray-400/10 dark:bg-gray-900/40 rounded-md sm:rounded-xl shadow-md dark:shadow-white/20 border-2 border-white/10"
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
                    <h1 className="text-lg lg:text-2xl px-2 sm:px-4 font-semibold mt-2">
                      {project.title}
                    </h1>
                    <p className="italic px-2 sm:px-4">{project.description}</p>
                    <Button
                      variant="outline"
                      className=" w-full text-sm lg:text-lg font-semibold hover:underline"
                    >
                      View More
                    </Button>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
