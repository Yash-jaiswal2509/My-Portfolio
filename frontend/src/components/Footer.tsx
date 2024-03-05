import { GithubIcon, Instagram, Linkedin, Twitter } from "lucide-react";



const Footer = () => {

    return (
        <div className="w-full h-20 px-10 flex items-center justify-between border-t-2 border-t-slate-300/50 bg-gray-400/10">
            <div className="w-80 font-inter font-semibold">All rights reserved</div>
            <div className="flex gap-8">
                <GithubIcon href="https://github.com/Yash-jaiswal2509" className="w-6 h-6 cursor-pointer hover:scale-110" />
                <Twitter href="https://twitter.com/YashJaiswa50855" className="w-6 h-6 cursor-pointer hover:scale-110" />
                <Linkedin href="https://www.linkedin.com/in/yash-jaiswal-aaa8112ab" className="w-6 h-6 cursor-pointer hover:scale-110" />
                <Instagram href="https://www.instagram.com/yashja2509/" className="w-6 h-6 cursor-pointer hover:scale-110" />
            </div>

        </div>
    )
}

export default Footer;