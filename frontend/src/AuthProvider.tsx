// AuthProvider.tsx
import { createContext, useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import * as ApiClient from "../src/api-client";

type AuthProviderProps = {
  isLoggedIn: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthProviderProps>({
  isLoggedIn: false,
  isAdmin: false,
});

export default function AuthProvider({ children }: { children: React.ReactNode; }) {
  const { data: userData, isError: userIsError, isSuccess: userSuccess } = useQuery({
    queryKey: ["validateToken"],
    queryFn: ApiClient.validateToken,
    retry: false,
  });

  const { data: adminData, isError: adminIsError, isSuccess: adminSuccess } = useQuery({
    queryKey: ["validateAdmin"],
    queryFn: ApiClient.validateAdmin,
    retry: false,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (userSuccess && userData) {
      setIsLoggedIn(true);
    }
  }, [userSuccess, userData]);

  useEffect(() => {
    if (userIsError) {
      setIsLoggedIn(false);
    }
  }, [userIsError]);

  useEffect(() => {
    if (adminSuccess && adminData) {
      setIsAdmin(true);
    }
  }, [adminSuccess, adminData]);

  useEffect(() => {
    if (adminIsError) {
      setIsAdmin(false);
    }
  }, [adminIsError]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used with an AuthProvider");
  }

  return context;
}
