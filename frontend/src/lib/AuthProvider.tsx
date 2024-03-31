import { createContext, useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import * as ApiClient from "../api-client";

type AuthContextProps = {
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextProps>({
  isAdmin: false,
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const { isError: userIsError, data: userData } = useQuery({
    queryKey: ["validateToken"],
    queryFn: ApiClient.validateToken,
    retry: false,
  });

  const contextValue: AuthContextProps = {
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
