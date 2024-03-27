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
  const response = await axios.get("api/v1/users/protected-route", {
    withCredentials: true,
  });

  if (response) {
    throw new Error("Something went wrong in fetching user details");
  }
  return response;
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
