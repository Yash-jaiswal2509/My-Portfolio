import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse";
import { apiError } from "../utils/apiError";
import { User } from "../models/user.model";
import { uploadToCloudinary } from "../utils/cloudinary";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  /*
    1. get user details from frontend
    2. validation - not empty
    3. check if user already exists: username, email
    4. upload them to cloudinary, avatar
    5. create user object - create entry in db
    6. remove password and refresh token field from response
    7. check for user creation
    8. return response
  */

  const { fullName, username, email, password } = req.body;
  // trim removes whitespace
  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new apiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  console.log(existingUser);

  if (existingUser) {
    throw new apiError(409, "User already exists");
  }

  const coverImageLocalPath = req.file;
  console.log(coverImageLocalPath);

  if (!coverImageLocalPath) {
    throw new apiError(400, "Cover image is required");
  }

  const coverIamge = await uploadToCloudinary(coverImageLocalPath);
  console.log(coverIamge);

  const user = await User.create({
    fullName,
    coverImage: coverIamge?.url,
    email,
    password,
    username: username.toLowerCase(),
  });

  console.log(user);

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new apiError(500, "Something went wrong while user registration");
  }

  res
    .status(201)
    .json(new apiResponse(200, createdUser, "User registered successfully"));

  console.log(res);
});

export { registerUser };
