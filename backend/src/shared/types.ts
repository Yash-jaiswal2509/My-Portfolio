import { Document } from "mongoose";

export interface UserDocument extends Document {
  fullName: string;
  username: string;
  email: string;
  password: string;
  coverImage: string;
  refreshToken: string;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): Promise<string>;
  generateRefreshToken(): Promise<string>;
}

export type ProjectType = {
  _id: string;
  projectName: string;
  description: string;
  video: string;
  image: string;
};
