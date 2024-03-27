import axios from "axios";
import { LoginFormData } from "./pages/Login";

//you will have to change thing if you want the info, you will have to return the response
export const register = async (formData: FormData) => {
  await axios
    .post("api/v1/users/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    })
    .then((res) => console.log(res.data))
    .catch((error: Error) => console.error(error));
};

export const validateToken = async () => {
  try {
    const response = await axios.get("api/v1/users/refresh-token", {
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Invalid Token");
  }
};

export const login = async (data: LoginFormData) => {
  await axios
    .post("api/v1/users/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => console.log(res.data))
    .catch((error: Error) => console.error(error));
};
