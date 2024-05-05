import axios from "axios";
import { useAuth } from "../lib/AuthProvider";

const apiURL = import.meta.env.VITE_API_URL as string;

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(`${apiURL}/api/v1/users/refresh-token`, {
      withCredentials: true,
    });
    setAuth((prev: {}) => {
      return {
        ...prev,
        accessToken: response.data.data.accessToken,
        roles: response.data.data.roles,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
