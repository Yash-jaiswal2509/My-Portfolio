import {
  createContext,
  PropsWithChildren,
  useState,
  useEffect,
  useContext,
} from "react";
import { useQuery } from "@tanstack/react-query";
import * as ApiClient from "../src/api-client";

type AuthProviderProps = PropsWithChildren<{
  isLoggedIn?: boolean;
}>;

const AuthContext = createContext<{ isLoggedIn: boolean }>({
  isLoggedIn: false,
});

export default function AuthProvider({
  children,
  isLoggedIn: initialLoggedInState = false,
}: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedInState);

  const { data, isError, isSuccess } = useQuery({
    queryKey: ["validateToken"],
    queryFn: ApiClient.validateToken,
    retry: false,
  });

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
