import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Autoplay from "embla-carousel-autoplay";
import { GithubIcon, Globe } from "lucide-react";
import { useParams } from "react-router-dom";

const ProjectById = () => {
  const { projectId } = useParams();
  const apiURL = import.meta.env.VITE_API_URL as string;

  const fetchById = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/api/v1/projects/${projectId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Unexpected status code" + response.status);
      }
    } catch (error) {
      console.log(error);
      throw new Error("Problem in fetching project");
    }
  };

  const { data: Project, isPending } = useQuery({
    queryKey: ["fetchProjectById"],
    queryFn: fetchById,
  });

  return (
    <div className="w-full p-3">
      {isPending ? (
        <>Loading</>
      ) : (
        <div className="p-2 bg-gray-400/10 dark:bg-gray-900/40 rounded-md sm:rounded-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-3">
            <Carousel
              className="shadow-lg dark:shadow-white/20 rounded-lg sm:rounded-xl overflow-hidden"
              plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
            >
              <CarouselContent>
                {Project.data.projectImages.map(
                  (image: string, index: number) => (
                    <CarouselItem key={index}>
                      <img
                        src={image}
                        className="w-full h-[285px] object-center"
                      />
                    </CarouselItem>
                  )
                )}
              </CarouselContent>
            </Carousel>
            <div className="py-2">
              <h1 className="font-bold text-center text-2xl">
                Important Links
              </h1>
              <div className="flex gap-3 mt-4">
                <a
                  href={Project.data?.deploymentLink}
                  target="_blank"
                  className="sm:px-10 sm:py-8 px-6 py-5 bg-gray-400/20 dark:bg-gray-900/40 rounded-md sm:rounded-xl w-full flex flex-col items-center cursor-pointer"
                >
                  <Globe
                    size={"35"}
                    className="hover:scale-110"
                  />
                  <p className="hover:scale-105 text-base sm:text-xl mt-4 text-center">
                    Deployment Link
                  </p>
                </a>
                <a
                  href={Project.data?.githubLink}
                  target="_blank"
                  className="sm:px-10 sm:py-8 px-6 py-5 bg-gray-400/20 dark:bg-gray-900/40 rounded-md sm:rounded-xl w-full flex flex-col items-center cursor-pointer"
                >
                  <GithubIcon
                    size={"35"}
                    className="hover:scale-110"
                  />
                  <p className="hover:scale-105 text-base sm:text-xl mt-4 text-center">
                    Github Link
                  </p>
                </a>
              </div>
            </div>
          </div>
          <h1 className="mx-4 mt-5 text-3xl sm:text-4xl font-bold">
            {Project.data.title}
          </h1>
          <div className="flex flex-wrap gap-x-1 gap-y-2 sm:gap-x-3 sm:gap-y-3 mx-4 sm:mx-6 mt-4">
            {Project.data.techStack.map((tech: string, index: number) => (
              <span
                key={index}
                className="bg-gray-400/20 dark:bg-gray-900/70 rounded-md sm:rounded-xl px-4 py-2 sm:text-base text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mx-2 my-4 text-xs whitespace-pre-line sm:text-base text-justify bg-gray-400/20 dark:bg-gray-900/60 rounded-md sm:rounded-xl p-4">
            {Project.data.longDescription}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectById;
