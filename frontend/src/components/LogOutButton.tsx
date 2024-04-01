import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import * as ApiClient from "../api-client";
import { toast } from "sonner";
import { LogOut } from "lucide-react";


const LogOutButton = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ApiClient.logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["validateToken"],
      });
      toast("Logged Out Successfully!!!", {
        closeButton: true,
      });
    },
    onError: () => {
      throw new Error("Something while invalidating queries");
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };


  return (
    <Button
      variant="outline"
      onClick={handleClick}
      className="mx-4 text-lg font-bold  hover:shadow-lg hidden sm:flex bg-white dark:bg-slate-900"
    >
      Log out <LogOut className="ml-2" size={22} />
    </Button>
  );
};

export default LogOutButton;
