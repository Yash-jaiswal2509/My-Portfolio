import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserType } from "../shared/types";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, require: true },
    username: { type: String, require: true },
    email: { type: String, required: true },
    password: { type: String, required: [true, "Password is required"] },
    confirmPassword: { type: String},
    coverImage: { type: String, reqruied: true },
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

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJwt = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      password: this.password,
      username: this.username,
    },
    process.env.JWT_SECRET_KEY as string,

    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_KEY as string,

    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model<UserType>("User", userSchema);
