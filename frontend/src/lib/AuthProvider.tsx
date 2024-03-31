import { createContext, useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import * as ApiClient from "../api-client";

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
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const { isError: userIsError, data: userData } = useQuery({
    queryKey: ["protectedRoute"],
    queryFn: ApiClient.protectedRoute,
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

  const contextValue: AuthContextProps = {
    isLoggedIn: !userIsError,
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
