import axios from "axios";
import { LoginFormData } from "./pages/Login";

const apiURL = import.meta.env.VITE_BACKEND_URL;

//you will have to change thing if you want the info, you will have to return the response
export const register = async (formData: FormData) => {
  try {
    const response = await axios
      .post(`${apiURL}/api/v1/users/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => console.log(res.data))
      .catch((error: Error) => console.error(error));

    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong while registering");
  }
};

export const protectedRoute = async () => {
  try {
    const response = await axios.post(
      `${apiURL}/api/v1/users/protected-route`,
      {
        withCredentials: true,
      }
    );

    if (response.status !== 200) {
      throw new Error("Something went wrong in fetching user details");
    }

    return response;
  } catch (error) {
    throw new Error("Error in fetching user details: " + error);
  }
};

export const login = async (data: LoginFormData) => {
  try {
    const response = await axios
      .post(`${apiURL}/api/v1/users/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch((error: Error) => console.error(error));

    return response;
  } catch (error) {
    throw new Error("Something wrong in loggin:" + error);
  }
};

export const logout = async () => {
  try {
    const response = await axios
      .post(`${apiURL}/api/v1/users/logout`)
      .catch((error) => {
        console.error(error);
      });

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const addProject = async (formData: FormData) => {
  try {
    const response = await axios
      .post(`${apiURL}/api/v1/projects/add-project`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then(res => console.log(res.data))
      .catch((error: Error) => console.error(error));

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${apiURL}/api/v1/projects`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Unexpected response status: " + response.status);
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects. Please try again later.");
  }
};
