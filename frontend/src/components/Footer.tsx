import { GithubIcon, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full h-20 px-4 sm:px-10 flex items-center justify-between border-t-2 border-t-slate-300/50 bg-gray-400/10">
      <div className="w-full text-sm sm:text-base font-inter font-semibold">All rights reserved ©</div>
      <div className="flex gap-4 sm:gap-8">
        {/* Target-> blank -->> when we want to open link in new tab */}
        <a href="https://github.com/Yash-jaiswal2509" target="_blank">
          <GithubIcon className="h-5 w-5 sm:w-6 sm:h-6 cursor-pointer hover:scale-125" />
        </a>
        <a href="https://twitter.com/YashJaiswa50855" target="_blank">
          <Twitter className="h-5 w-5 sm:w-6 sm:h-6 cursor-pointer hover:scale-125" />
        </a>
        <a href="https://www.linkedin.com/in/yash-jaiswal-aaa8112ab" target="_blank">
          <Linkedin className="h-5 w-5 sm:w-6 sm:h-6 cursor-pointer hover:scale-125" />
        </a>
        <a href="https://www.instagram.com/yashja2509/" target="_blank">
          <Instagram className="h-5 w-5 sm:w-6 sm:h-6 cursor-pointer hover:scale-125" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
