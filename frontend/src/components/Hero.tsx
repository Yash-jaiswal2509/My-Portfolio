import { useEffect, useState } from "react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { Button } from "./ui/button";
import { ArrowRightToLine } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const startDate = new Date("2023-09-01");
  const currentDate = new Date();

  const months =
    (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
    (currentDate.getMonth() - startDate.getMonth());

  interface GithubInfo {
    public_repos: number;
    avatar_url: string;
  }
  const [githubInfo, setGithubInfo] = useState<GithubInfo | null>();

  useEffect(() => {
    const githubProfile = async () => {
      const response = await axios.get(
        "https://api.github.com/users/Yash-jaiswal2509"
      );

      if (!response.data) {
        throw new Error("Github data fetch error");
      }

      setGithubInfo(response.data);
    };

    githubProfile();
  }, []);

  return (
    <div className="w-full h-full p-2 sm:p-5 flex xl:flex-row flex-col gap-5 flex-1">
      <div className="flex w-full flex-col gap-5">
        <div className="flex gap-5 md:flex-row flex-col">
          <div className="p-10 flex flex-col gap-5 items-center justify-between bg-gray-400/10 dark:bg-gray-900/60 rounded-xl font-semibold shadow-md dark:shadow-white/20 hover:scale-105">
            <h1 className="text-2xl text-nowrap">Number of projects</h1>
            <span className="text-5xl">
              {githubInfo ? (
                githubInfo.public_repos + "+"
              ) : (
                <RotatingLines
                  strokeColor="grey"
                  width="40"
                  strokeWidth="6"
                  animationDuration="0.75"
                />
              )}
            </span>
          </div>
          <div className="p-10 flex flex-col items-center w-full justify-between bg-gray-400/10 dark:bg-gray-900/60 rounded-xl shadow-md dark:shadow-white/20 hover:scale-105">
            <h1 className="text-2xl font-semibold">Experience</h1>
            <h1 className="text-lg">(in months)</h1>
            <span className="text-5xl font-semibold">{months}+</span>
          </div>
        </div>
        <div className="p-5 sm:p-8 h-full flex flex-col bg-gray-400/10 dark:bg-gray-900/60 rounded-xl gap-2 shadow-md dark:shadow-white/20 ">
          <h1 className="text-2xl font-semibold ">Featured Project</h1>
          <div className="grid grid-cols-2 gap-4 w-full">
            <img
              src="/assets/KoinX-image.jpg"
              alt="Thumbnail"
              className=" h-full rounded-lg shadow-lg shadow-gray-600"
            />
            <p className="text-xs sm:text-base">
              A dynamic frontend website for a cryptocurrency-focused company,
              leveraging Coingecko’s API to retrieve real-time data, thus
              providing users with accurate and up-to-date information on
              various cryptocurrencies.
            </p>
          </div>
          <Button className="mt-4 text-lg font-extrabold">
            Explore
            <ArrowRightToLine size={20} strokeWidth={3} className="ml-1" />
          </Button>
        </div>
      </div>
      <div className="w-full px-1 sm:px-4 py-8 flex flex-col bg-gray-400/10 dark:bg-gray-900/60 rounded-xl gap-2 shadow-md dark:shadow-white/20">
        <h1 className=" text-2xl font-semibold text-center">My introduction</h1>
        <span className="mb-2">
          {githubInfo ? (
            <div className="flex gap-2 justify-between items-center italic">
              <img
                src={githubInfo.avatar_url}
                className="h-24 sm:h-36 rounded-full"
              />
              <p className=" sm:text-base text-xs">
                Welcome to my portfolio!! 🌟 Each project is a story, waiting
                for you to unfold. Thanks for stopping by—let’s make something
                amazing together! 🧑🏻‍💻
              </p>
            </div>
          ) : (
            <RotatingLines
              strokeColor="grey"
              width="60"
              strokeWidth="6"
              animationDuration="0.75"
            />
          )}
        </span>
        <div className="text-left text-nowrap text-sm flex flex-col gap-1">
          <h1 className="py-1 px-2 rounded-lg bg-gray-400/20 hover:bg-slate-300/80 dark:bg-slate-700 dark:hover:bg-slate-800">
            Name: Yash Jaiswal
          </h1>
          <h1 className="py-1 px-2 rounded-lg bg-gray-400/20 hover:bg-slate-300/80 dark:bg-slate-700 dark:hover:bg-slate-800">
            Degree: Bachelor of Technology
          </h1>
          <h1 className="py-1 px-2 rounded-lg bg-gray-400/20 hover:bg-slate-300/80 dark:bg-slate-700 dark:hover:bg-slate-800 flex gap-1 ">
            College:
            <p className="hidden sm:block">
              Sardar Vallabhbhai National Institute of Technology
            </p>
            <p className="sm:hidden">Nit Surat, Gujarat</p>
          </h1>
          <h1 className="py-1 px-2 rounded-lg bg-gray-400/20 hover:bg-slate-300/80 dark:bg-slate-700 dark:hover:bg-slate-800 flex gap-1">
            Interests:
            <p className="hidden sm:block">
              Coding, programming and web development
            </p>
            <p className="sm:hidden">Coding, programing, web development</p>
          </h1>
          <h1 className="py-1 px-2 rounded-lg bg-gray-400/20 hover:bg-slate-300/80 dark:bg-slate-700 dark:hover:bg-slate-800">
            Email: yashjaiswal2509@gmail.com
          </h1>
          <div className="py-1 px-2 rounded-lg bg-gray-400/20 hover:bg-slate-300/80 dark:bg-slate-700 dark:hover:bg-slate-800 flex flex-col gap-2">
            <p className=" text-xl text-center">Summary</p>
            <p className="text-wrap text-center">
              I'm a Fullstack Developer specializing in the MERN Stack, adeptly
              translates mockups into responsive interfaces. Proficient in Java,
              JavaScript, HTML, CSS, and TypeScript, also works with backend
              technologies like Node.js and MongoDB. Frameworks such as Tailwind
              CSS, React.js, Next.js, and Express.js are part of my toolkit.
            </p>
            <p
              onClick={() => navigate("/about")}
              className=" text-center text-cyan-500 underline cursor-pointer"
            >
              Read more...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
