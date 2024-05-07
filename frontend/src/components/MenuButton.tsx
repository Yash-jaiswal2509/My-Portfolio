import { LogIn, Menu, Moon, Settings, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SideBarTypes } from "@/types/Sidebar";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useTheme } from "@/lib/theme-provider";
import { Button } from "./ui/button";
import LogOutButton from "./LogOutButton";
import { useAuth } from "../lib/AuthProvider";

const MenuButton = () => {
  const { setTheme, theme } = useTheme();
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const [selectDiv, setSelectDiv] = useState(0);

  useEffect(() => {
    const storedIndex = localStorage.getItem("selectedSidebarIndex");
    if (storedIndex !== null) {
      setSelectDiv(parseInt(storedIndex));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedSidebarIndex", selectDiv.toString());
  }, [selectDiv]);

  useEffect(() => {
    const selectedIndex = SideBarTypes.findIndex(
      (item) => item.path === location.pathname
    );
    if (selectedIndex !== -1) {
      setSelectDiv(selectedIndex);
    }
  }, [location.pathname]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu size={35} className=" sm:hidden my-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="h-dvh flex flex-col px-4 gap-2 bg-[#f5f6f7]/90 dark:bg-[#121827]/90 backdrop-blur-md w-dvw rounded-none">
        <DropdownMenuLabel className="text-base text-gray-500">
          Yash's Portfolio
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {SideBarTypes.map((items, index) => (
          <DropdownMenuItem
            className={`p-2 text-base flex gap-3 items-center rounded-lg ${
              index === selectDiv ? " bg-primary/10" : ""
            }`}
            key={index}
            onClick={() => {
              navigate(`${items.path}`);
              setSelectDiv(index);
            }}
          >
            <items.icon />
            <button>{items.name}</button>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator color="gray" />
        <DropdownMenuLabel className="flex gap-2 text-base text-gray-500">
          <Settings size={18} />
          Settings
        </DropdownMenuLabel>
        <DropdownMenuItem>
          {theme === "dark" ? (
            <Button
              variant={"outline"}
              className=" w-full font-bold text-lg bg-slate-900"
              onClick={() => setTheme("light")}
            >
              <Sun className="mr-2" size={20} />
              Light
            </Button>
          ) : (
            <Button
              variant={"outline"}
              className=" w-full font-bold text-lg "
              onClick={() => setTheme("dark")}
            >
              <Moon className="mr-2" size={20} />
              Dark
            </Button>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem className="w-full">
          {isLoggedIn ? (
            <div className="w-full">
              <LogOutButton />
            </div>
          ) : (
            <Button
              variant="outline"
              className="text-lg font-bold w-full dark:bg-slate-900"
            >
              <Link to="/login" className="flex">
                <LogIn className="mr-2" />
                Login
              </Link>
            </Button>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuButton;
