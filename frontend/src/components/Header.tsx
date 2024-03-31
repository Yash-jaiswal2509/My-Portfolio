import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/AuthProvider";
import LogOutButton from "./LogOutButton";
import MenuButton from "./MenuButton";

const Header = () => {
  const { isLoggedIn, userDetail } = useAuth();

  return (
    <div className="p-2 sm:p-5 h-20 flex items-center justify-between shadow-sm shadow-gray-300 dark:shadow-slate-500 bg-gray-400/10">
      <div className=" sm:px-2 flex items-center sm:gap-3 cursor-pointer">
        <Link to="/">
          <img
            src="My-logo-light.png"
            className=" w-12 h-12 sm:h-16 sm:w-16 dark:hidden"
          />
          <img
            src="My-logo-dark.png"
            className=" w-12 h-12 sm:h-16 sm:w-16 hidden dark:block"
          />
        </Link>
        <h1 className="font-inter text-sm sm:text-lg md:text-2xl font-black hover:opacity-75">
          Yash's Portfolio
          <br />
          <p className="text-xs ml-1 text-ellipsis">
            Learning, Building, Repeating
          </p>
        </h1>
      </div>
      <div className="flex hover:opacity-95">
        <div>
          <MenuButton />
        </div>
        <ModeToggle />
        {isLoggedIn ? (
          <div className="flex gap-2">
            <LogOutButton />
            <img
              src={userDetail.data.user.coverImage}
              alt="User-Image"
              className=" w-12 h-12 sm:h-16 sm:w-16 hidden sm:block rounded-full"
            />
          </div>
        ) : (
          <Link to="/login">
            <Button
              className={cn(
                "mx-4 text-lg font-bold  hover:shadow-lg hidden sm:flex"
              )}
            >
              Login <LogIn className="ml-1" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
