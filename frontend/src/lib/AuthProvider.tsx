import { createContext, useState, useContext } from "react";

type AuthContextProps = {
  apiURL: string;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  userDetail: any;
  setUserDetail: (userDetail: any) => void;
};

const initialState: AuthContextProps = {
  apiURL: "",
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userDetail: null,
  setUserDetail: () => {},
};

//these are all the initialState which also matches the useState variables, so don't get confused

const AuthContext = createContext<AuthContextProps>(initialState);

//wrapper for the AuthContext
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userDetail, setUserDetail] = useState<any>("");

  const contextValue: AuthContextProps = {
    apiURL: import.meta.env.VITE_API_URL as string,
    isLoggedIn,
    setIsLoggedIn: (value: boolean) => setIsLoggedIn(value),
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
