import axios from "axios";
import { useAuth } from "../lib/AuthProvider";

const apiURL = import.meta.env.VITE_API_URL as string;

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/v1/users/refresh-token`, {
        withCredentials: true,
      });

      setAuth((prevAuth: any) => {
        console.log("Previous auth state:", prevAuth);

        const updatedAuth = {
          ...prevAuth,
          accessToken: response.data.data.accessToken,
          roles: response.data.data.roles,
        };

        console.log("Updated auth state:", updatedAuth);

        return updatedAuth;
      });

      return response.data.data.accessToken;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      throw error;
    }
  };

  return refresh;
};

export default useRefreshToken;
