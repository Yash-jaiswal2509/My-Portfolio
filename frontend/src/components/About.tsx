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
      console.log(response.data);
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
    <div className="w-full h-full p-5 flex gap-2 flex-1">
      <div className="w-full px-4 py-8 flex flex-col bg-gray-400/10 dark:bg-gray-900/60 rounded-xl gap-2 shadow-md dark:shadow-white/20">
        <h1 className=" text-2xl font-semibold text-center">My introduction</h1>
        <span className="mb-2">
          {githubInfo ? (
            <div className="flex gap-2 justify-between items-center italic">
              <img src={githubInfo.avatar_url} className=" h-36 rounded-full" />
              <p>
                Welcome to my portfolio!! 🌟 Each project is a story, waiting
                for you to unfold. Thanks for stopping by—let’s make something
                amazing together! 🚀
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
          <h1 className="py-1 px-2 rounded-lg bg-gray-400/20 dark:bg-slate-700">
            Name: Yash Jaiswal
          </h1>
          <h1 className="py-1 px-2 rounded-lg bg-gray-400/20 dark:bg-slate-700">
            Degree: Bachelor of Technology
          </h1>
          <h1 className="py-1 px-2 rounded-lg bg-gray-400/20 dark:bg-slate-700 flex gap-1">
            College:<p> Sardar Vallabhbhai National Institute of Technology</p>
          </h1>
          <h1 className="py-1 px-2 rounded-lg bg-gray-400/20 dark:bg-slate-700 flex gap-1">
            Interests:<p> Coding, programming and web development</p>
          </h1>
          <h1 className="py-1 px-2 rounded-lg bg-gray-400/20 dark:bg-slate-700">
            Email: yashjaiswal2509@gmail.com
          </h1>
          <div className="py-1 px-2 rounded-lg bg-gray-400/20 dark:bg-slate-700 flex flex-col gap-2">
            <p className=" text-xl text-center">Summary</p>
            <p className="text-wrap text-center">
              I'm a Fullstack Developer specializing in the MERN Stack, adeptly
              translates mockups into responsive interfaces. Proficient in Java,
              JavaScript, HTML, CSS, and TypeScript, also works with backend
              technologies like Node.js and MongoDB. Frameworks such as Tailwind
              CSS, React.js, Next.js, and Express.js are part of my toolkit.
            </p>
            <p className="text-wrap text-center">
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
              ? `absolute m-auto inset-0 w-fit font-semibold text-md`
              : "hidden"
          }
        >
          <a href="https://drive.google.com/file/d/1qJbFTpkR1bly7Drdg9jkZETSdnzgzMWu/view?usp=sharing">
            Click to Open
          </a>
          <ArrowUpRightSquare strokeWidth={2} size={20} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default About;
