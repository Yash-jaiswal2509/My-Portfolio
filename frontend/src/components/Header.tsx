import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="p-5 h-20 flex items-center justify-between shadow-sm shadow-gray-300 dark:shadow-slate-500 bg-gray-400/10">
      <div className=" px-2 flex items-center gap-3 cursor-pointer">
        <img src="My-logo-light.png" className="h-16 w-16 dark:hidden" />
        <img src="My-logo-dark.png" className="h-16 w-16 hidden dark:block" />
        <h1 className="font-inter text-2xl font-black hover:opacity-75">
          Yash's Portfolio
          <br />
          <p className="text-xs ml-1">Learning, Building, Repeating</p>
        </h1>
      </div>
      <div></div>
      <div className="flex hover:opacity-95">
        <ModeToggle />
        <Link to="/login">
          <Button className={cn("mx-4 text-lg font-bold  hover:shadow-lg")}>
            Login
            <ArrowRight className="ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
