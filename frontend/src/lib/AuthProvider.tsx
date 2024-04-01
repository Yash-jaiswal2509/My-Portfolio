import { createContext, useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import * as ApiClient from "../api-client";

type AuthContextProps = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  userDetail: any;
  setUserDetail: (userDetail: any) => void;
};

const initialState: AuthContextProps = {
  isLoggedIn: false,
  isAdmin: false,
  setIsAdmin: () => {},
  userDetail: null,
  setUserDetail: () => {},
};

//these are all the initialState which also matches the useState variables, so don't get confused

const AuthContext = createContext<AuthContextProps>(initialState);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userDetail, setUserDetail] = useState<any>("");
  const { isError } = useQuery({
    queryKey: ["validateToken"],
    queryFn: ApiClient.validateToken,
    retry: false,
  });

  const contextValue: AuthContextProps = {
    isLoggedIn: !isError,
    isAdmin,
    setIsAdmin: (value: boolean) => setIsAdmin(value),
    userDetail,
    setUserDetail: (value: any) => setUserDetail(value),
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
