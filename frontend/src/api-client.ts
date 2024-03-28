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
    const response = await axios.post("api/v1/users/protected-route", {
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error("Something went wrong in fetching user details");
    }

    return response;
  } catch (error) {
    throw new Error("Error in fetching user details: " + error);
  }
};

export const login = async (data: LoginFormData) => {
  const response = await axios.post("api/v1/users/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const logout = async () => {
  await axios.post("api/v1/users/logout");
};

export const validateAdmin = async () => {
  try {
    const response = await axios.post("api/v1/users/admin-token");

    if (response.status !== 200) {
      throw new Error("Something went wrong");
    }

    return response;
  } catch (error) {
    throw new Error("Error in fetching admin details");
  }
};
