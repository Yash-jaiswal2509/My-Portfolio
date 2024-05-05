import { asyncHandler } from "../utils/asyncHandler";
import { apiResponse } from "../utils/apiResponse";
import { apiError } from "../utils/apiError";
import { Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { uploadToCloudinary } from "../utils/cloudinary";
import { User } from "../models/user.model";
import { UserDocument } from "../shared/types";

const generateTokensAndSetAdmin = async (userId: string) => {
  try {
    const user = (await User.findById(userId)) as UserDocument;

    const accessToken = await user.generateAccessToken();
    // console.log(accessToken);

    if (user.username === "yashjai2509") {
      user.roles = ["admin", "user"];
    }

    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;

    //validation not required because email and password is already verified
    await user?.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(500, "Something went wrong while generating tokens");
  }
};

//register
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

  //This comes from client side or frontend
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

  //Taking a cover-image, when registering
  const coverImageLocalPath = req.files as Express.Multer.File[];

  //uploading it to cloudinary
  const coverImages = await uploadToCloudinary(coverImageLocalPath);

  const coverImageUrls = coverImages
    ? coverImages.map((image) => image.url)
    : [];

  //creating a user by taking input from req.body and req.file
  const user = await User.create({
    fullName,
    coverImage: coverImageUrls,
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new apiError(500, "Something went wrong while user registration");
  }

  //When user successfully registers we are sending response to client using createdUser in which we are not sending password and refresh token
  res
    .status(201)
    .json(new apiResponse(200, createdUser, "User registered successfully"));
});

//login
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  /*
  --req body -> data
  --email
  --check if registered or not
  --password check
  --access token and refresh token
  --send secure cookies
  --response
  */

  // taking input from user or frontend through req.body
  const { email, username, password } = req.body;

  //when you only want to login through one parameter, either username or email
  if (!username && !email) {
    throw new apiError(400, "Username or Email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new apiError(404, "User doesn't exists");
  }

  //this is done while building model
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new apiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateTokensAndSetAdmin(
    user._id
  );

  //sending data to client except password and refresh token
  const loggedInUser = await User.findById(user._id).select(
    "-fullName -email -password -refreshToken -__v -createdAt -updatedAt"
  );

  const options = {
    httpOnly: true,
    secure: true,
    maxAge: 10 * 24 * 60 * 60 * 1000,
  };

  //sending tokens in form of cookies and data in form of json
  res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(
        200,
        { user: loggedInUser, accessToken },
        "User logged in Successfully"
      )
    );
});

//logout
const logOutUser = asyncHandler(async (req: Request, res: Response) => {
  // Delete access token in client side
  const incomingRefreshToken = req.cookies.refreshToken;

  if (!incomingRefreshToken) {
    throw new apiError(401, "No token in cookies");
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET as Secret
  ) as JwtPayload;

  const userId = decodedToken._id;

  const user = await User.findById(userId);

  const options = {
    httpOnly: true,
    secure: true,
  };

  if (!user) {
    res.clearCookie("refreshToken", options);
    res.json(new apiResponse(204, "User successfully logged out"));
  }

  //This will only happen when either the refreshToken is expired or not present in the database
  if (user?.refreshToken !== incomingRefreshToken) {
    res.clearCookie("refreshToken", options);
    res.json(new apiResponse(204, "User successfully logged out"));
  }

  //we found refreshToken in the user DB
  if (user) {
    user.refreshToken = "";
    await user?.save({ validateBeforeSave: false });
  }

  res.clearCookie("refreshToken", options);
  res.json(new apiResponse(204, "User successfully logged out"));
});

//refreshing token
const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
  try {
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) {
      throw new apiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET as Secret
    ) as JwtPayload;

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new apiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new apiError(401, "Refresh token is expired or used");
    }

    const roles = user.roles;

    const newAccessToken = await user.generateAccessToken();
    res
      .status(200)
      .json(
        new apiResponse(
          200,
          { accessToken: newAccessToken, roles },
          "Access token refreshed"
        )
      );
  } catch (error) {
    //Fails to decode refresh token form cookies
    throw new apiError(401, (error as string) || "Invalid refresh token");
  }
});

export { registerUser, loginUser, logOutUser, refreshAccessToken };
