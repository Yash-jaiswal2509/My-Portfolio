import mongoose, { Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserDocument } from "../shared/types";

interface UserModel extends Model<UserDocument> {}

const userSchema = new mongoose.Schema<UserDocument, UserModel>(
  {
    fullName: { type: String, require: true },
    username: { type: String, require: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: [true, "Password is required"] },
    coverImage: [{ type: String, required: true }],
    refreshToken: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function (): Promise<string> {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      password: this.password,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET as string,

    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = async function (): Promise<string> {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET as string,

    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model<UserDocument, UserModel>("User", userSchema);
