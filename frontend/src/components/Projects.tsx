import { ProjectType } from "../../../backend/src/shared/types";
import { PlusCircle } from "lucide-react";
import TechStack from "./TechStack";
import { Button } from "./ui/button";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as ApiClient from "../api-client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

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
    <div className="overflow-hidden flex flex-col">
      <TechStack />
      <div className=" flex flex-col p-5 ">
        {isAdmin ? (
          <Button
            variant="secondary"
            className=" text-lg font-bold "
            onClick={() => navigate("/add-project")}
          >
            Add Project <PlusCircle className="ml-2" />
          </Button>
        ) : (
          <></>
        )}

        <div className="p-5 w-full grid grid-cols-2 gap-6">
          {ProjectsData?.data.data.map(
            (project: ProjectType, index: number) => {
              return (
                <div
                  key={index}
                  className="p-4 flex flex-col gap-2 bg-gray-400/10 dark:bg-gray-900/40 rounded-xl shadow-md dark:shadow-white/20 border-2 border-white/10"
                >
                  <Carousel
                    className="shadow-lg dark:shadow-white/20 rounded-xl overflow-hidden"
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
                  <h1 className="text-2xl font-semibold mt-2">
                    {project.title}
                  </h1>
                  <p className="italic -mt-2">{project.description}</p>
                  <Button
                    variant="outline"
                    className=" w-full text-lg font-semibold hover:underline"
                  >
                    View More
                  </Button>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
