import axios from "axios";
import { useAuth } from "../lib/AuthProvider";

const useRefreshToken = () => {
  const apiURL = import.meta.env.VITE_API_URL as string;
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(`${apiURL}/api/v1/users/refresh-token`, {
      withCredentials: true,
    });

    setAuth((prev: any) => {
      console.log(prev.accessToken);
      console.log(response.data.accessToken);
      return {
        ...prev,
        accessToken: response.data.accessToken,
        roles: response.data.roles,
      };
    });
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
