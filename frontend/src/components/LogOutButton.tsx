import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/AuthProvider";
import { useEffect } from "react";

const LogOutButton = () => {
  const { setIsLoggedIn, auth, setAuth } = useAuth();
  const apiURL = import.meta.env.VITE_API_URL as string;
  const token = auth.accessToken;

  const logout = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/v1/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const mutation = useMutation({
    mutationFn: logout,
  });

  const handleClick = () => {
    mutation.mutate();
  };

  useEffect(() => {
    if (mutation.data?.data.success) {
      setIsLoggedIn(false);
      setAuth({});
      toast("Logged Out Successfully!!!", {
        closeButton: true,
      });
    }
  }, [mutation.data?.data.success, setIsLoggedIn, setAuth]);

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      className="sm:mx-4 text-lg font-bold w-full h-full hover:shadow-lg sm:flex bg-white dark:bg-slate-900"
    >
      {mutation.isPending ? "Loggin Out..." : "Log out"}
      <LogOut className="ml-2" size={22} />
    </Button>
  );
};

export default LogOutButton;
