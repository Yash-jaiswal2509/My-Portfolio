import { GithubIcon, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full h-20 px-10 flex items-center justify-between border-t-2 border-t-slate-300/50 bg-gray-400/10">
      <div className="w-80 font-inter font-semibold">All rights reserved ©</div>
      <div className="flex gap-8">
        {/* Target-> blank -->> when we want to open link in new tab */}
        <a href="https://github.com/Yash-jaiswal2509" target="_blank">
          <GithubIcon className="w-6 h-6 cursor-pointer hover:scale-125" />
        </a>
        <a href="https://twitter.com/YashJaiswa50855">
          <Twitter className="w-6 h-6 cursor-pointer hover:scale-125" />
        </a>
        <a href="https://www.linkedin.com/in/yash-jaiswal-aaa8112ab">
          <Linkedin className="w-6 h-6 cursor-pointer hover:scale-125" />
        </a>
        <a href="https://www.instagram.com/yashja2509/">
          <Instagram className="w-6 h-6 cursor-pointer hover:scale-125" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
