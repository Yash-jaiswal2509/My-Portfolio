import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { apiError } from "../utils/apiError";
import { User } from "../models/user.model";

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

  if (existingUser) {
    throw new apiError(409, "User already exists");
  }

    

});

export { registerUser };
