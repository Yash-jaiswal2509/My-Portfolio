import axios from "axios";

export const register = async (formData: FormData) => {
  const response = await axios
    .post("api/v1/users/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    })
    .then((res) => console.log(res.data))
    .catch((error: Error) => console.error(error));
  return response;
};
