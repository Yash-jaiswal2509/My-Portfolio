import axios from "axios";
import { LoginFormData } from "./pages/Login";



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
