export type UserType = {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  refreshToken: string;
};

export type ProjectType = {
  _id: string;
  projectName: string;
  description: string;
  video: string;
  image: string;
};