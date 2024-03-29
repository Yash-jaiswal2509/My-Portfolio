import axios from "axios";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Button } from "./ui/button";
import { ArrowUpRightSquare } from "lucide-react";

const About = () => {
  interface GithubInfo {
    public_repos: number;
    avatar_url: string;
  }

  const [githubInfo, setGithubInfo] = useState<GithubInfo | null>();
  const [hover, setHover] = useState("brightness-90");

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

  const handleMouseOver = () => {
    setHover("hover:brightness-50");
  };

  const handleMouseDown = () => {
    setHover("");
  };

  return (
    <div className="w-full h-full p-2 sm:p-5 flex xl:flex-row flex-col gap-2 flex-1">
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
          <h1 className="py-1 px-2 rounded-lg bg-gray-400/20 dark:bg-slate-700 dark:hover:bg-slate-800">
            Name: Yash Jaiswal
          </h1>
          <h1 className="py-1 px-2 rounded-lg bg-gray-400/20 dark:bg-slate-700 dark:hover:bg-slate-800">
            Degree: Bachelor of Technology
          </h1>
          <h1 className="py-1 px-2 rounded-lg bg-gray-400/20 hover:bg-slate-300/80 dark:bg-slate-700 dark:hover:bg-slate-800 flex gap-1 ">
            College:
            <p className="hidden sm:block">
              Sardar Vallabhbhai National Institute of Technology
            </p>
            <p className="sm:hidden">Nit Surat, Gujarat</p>
          </h1>
          <h1 className="py-1 px-2 rounded-lg bg-gray-400/20 hover:bg-slate-300/80 dark:bg-slate-700 dark:hover:bg-slate-800 flex gap-1 text-xs sm:text-base">
            Interests:
            <p className="hidden sm:block">
              Coding, programming and web development
            </p>
            <p className="sm:hidden">Coding, programing, web development</p>
          </h1>
          <h1 className="py-1 px-2 rounded-lg bg-gray-400/20 dark:bg-slate-700 dark:hover:bg-slate-800">
            Email: yashjaiswal2509@gmail.com
          </h1>
          <div className="py-1 px-2 rounded-lg bg-gray-400/20 dark:bg-slate-700 dark:hover:bg-slate-800 flex flex-col gap-2">
            <p className="text-lg sm:text-xl text-center">Summary</p>
            <p className="text-wrap text-center sm:text-base text-xs">
              I'm a Fullstack Developer specializing in the MERN Stack, adeptly
              translates mockups into responsive interfaces. Proficient in Java,
              JavaScript, HTML, CSS, and TypeScript, also works with backend
              technologies like Node.js and MongoDB. Frameworks such as Tailwind
              CSS, React.js, Next.js, and Express.js are part of my toolkit.
            </p>
            <p className="text-wrap text-center sm:text-base text-xs">
              Additionally, I'm well-versed in tools like Figma, Git/GitHub,
              Microsoft Excel, and LaTeX, demonstrating strong organizational
              skills. Eager to contribute creativity, technical expertise and
              ready to collaborate with dynamic development teams. 👨‍💻
            </p>
          </div>
        </div>
      </div>
      <div
        onMouseOver={handleMouseOver}
        onMouseDown={handleMouseDown}
        className=" w-full rounded-xl shadow-md dark:shadow-white/20 relative"
      >
        <a
          href="https://drive.google.com/file/d/1qJbFTpkR1bly7Drdg9jkZETSdnzgzMWu/view?usp=sharing"
          target="_blank"
        >
          <img
            src="assets/my-resume.jpg"
            alt="my-resume"
            className={`h-full rounded-lg ${hover}`}
          />

          <Button
            onMouseOver={handleMouseOver}
            onMouseDown={handleMouseDown}
            className={
              hover === "hover:brightness-50"
                ? `absolute m-auto inset-0 w-fit font-semibold text-base`
                : "hidden"
            }
          >
            Click to Open
            <ArrowUpRightSquare strokeWidth={2} size={20} className="ml-2" />
          </Button>
        </a>
      </div>
    </div>
  );
};

export default About;
