import { createContext, useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import * as ApiClient from "../src/api-client";

type AuthProviderProps = {
  isLoggedIn?: boolean;
};

const AuthContext = createContext<AuthProviderProps | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isError, isSuccess } = useQuery({
    queryKey: ["validateToken"],
    queryFn: ApiClient.validateToken,
    retry: false,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    if (isSuccess && data) {
      setIsLoggedIn(true);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      setIsLoggedIn(false);
    }
  }, [isError]);

  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used with an AuthProvider");
  }

  return context;
};
