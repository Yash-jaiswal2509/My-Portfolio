import { createContext, useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import * as ApiClient from "../api-client";
import { toast } from "sonner";

type AuthContextProps = {
  isLoggedIn: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  isAdmin: false,
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const { isError: userIsError, data: userData } = useQuery({
    queryKey: ["validateToken"],
    queryFn: ApiClient.validateToken,
    retry: false,
  });

  useEffect(() => {
    if (
      userData &&
      userData.data &&
      userData.data.data.userId === "66045c9402f822aa92aeda55"
    ) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [userData]);

  useEffect(() => {
    if (userData && !userIsError) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userData, userIsError]);

  useEffect(() => {
    if (isLoggedIn) {
      toast("User successfully logged in");
    } else {
      toast("User successfully logged out");
    }
  }, [isLoggedIn]);

  const contextValue: AuthContextProps = {
    isLoggedIn,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used with an AuthProvider");
  }
  return context;
}
