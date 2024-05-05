import { createContext, useState, useContext } from "react";

type AuthContextProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  auth: any;
  setAuth: (auth: any) => void;
};

const initialState: AuthContextProps = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  auth: null,
  setAuth: () => {},
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
  const [auth, setAuth] = useState<any>({});

  const contextValue: AuthContextProps = {
    isLoggedIn,
    setIsLoggedIn: (value: boolean) => setIsLoggedIn(value),
    auth,
    setAuth: (value: any) => setAuth(value),
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
