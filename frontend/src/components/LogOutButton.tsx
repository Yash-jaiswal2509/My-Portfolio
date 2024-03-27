import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import * as ApiClient from "../api-client";
import { toast } from "sonner";

const LogOutButton = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ApiClient.logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["validateToken"],
      });
      toast("Logged Out Successfully!!!");
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <Button
      onClick={handleClick}
      className="mx-4 text-lg font-bold  hover:shadow-lg"
    >
      Log out
    </Button>
  );
};

export default LogOutButton;
