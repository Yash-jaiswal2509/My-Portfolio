import { Document } from "mongoose";

//required to change the types as writing in typescript.(included last 3 fields)
export interface UserDocument extends Document {
  fullName: string;
  username: string;
  email: string;
  password: string;
  coverImage: string;
  refreshToken: string;
  roles: string[];
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): Promise<string>;
  generateRefreshToken(): Promise<string>;
}

export type ProjectType = {
  title: string;
  shortDescription: string;
  longDescription: string;
  projectImages: string[];
  techStack: string[];
  deploymentLink: string;
  githubLink: string;
  featured: boolean;
};
