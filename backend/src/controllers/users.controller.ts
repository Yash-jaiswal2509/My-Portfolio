import { asyncHandler } from "../utils/asyncHandler";
import { apiResponse } from "../utils/apiResponse";
import { apiError } from "../utils/apiError";
import { Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { uploadToCloudinary } from "../utils/cloudinary";
import { User } from "../models/user.model";
import { UserDocument } from "../shared/types";

const generateAccessAndRefreshTokens = async (userId: string) => {
  try {
    const user = (await User.findById(userId)) as UserDocument;

    const accessToken = await user.generateAccessToken();
    // console.log(accessToken);
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
  const { fullName, username, email, password } = req.body;

  if ([fullName, username, email, password].some(field => !field || field.trim() === '')) {
    throw new apiError(400, 'All fields are required');
  }

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new apiError(409, 'User already exists');
  }

  const coverImageLocalPath = req.files as Express.Multer.File[];
  if (!coverImageLocalPath || !coverImageLocalPath.length) {
    throw new apiError(400, 'Cover image is required');
  }

  const coverImages = await uploadToCloudinary(coverImageLocalPath);
  if (!coverImages || !coverImages.length) {
    throw new apiError(500, 'Failed to upload cover image(s)');
  }

  const coverImageUrls = coverImages.map(image => image.url);

  const user = await User.create({
    fullName,
    coverImage: coverImageUrls,
    email,
    password,
    username: username.toLowerCase(),
  });

  if (!user) {
    throw new apiError(500, 'Something went wrong while user registration');
  }

  const { password: _, refreshToken: __, ...userWithoutSensitiveData } = user.toObject();

  res.status(201).json(new apiResponse(200, userWithoutSensitiveData, 'User registered successfully'));
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

  //this is done while building model through
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new apiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  //sending data to client except password and refresh token
  const loggedInUser = await User.findById(user._id.toString()).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  //sending tokens in form of cookies and data in form of json
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in Successfully"
      )
    );
});

//logout
const logOutUser = asyncHandler(async (req: Request, res: Response) => {
  const loggedOutUser = await User.findByIdAndUpdate(
    req.user._id.toString(),
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, "User logged out"));
});

//refreshing token
const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      throw new apiError(401, "unauthorized request");
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
    const userId = user?._id;

    const options = {
      httpOnly: true,
      secure: true,
    };

    //asigning in objects property
    const { accessToken, refreshToken: newRefreshtoken } =
      await generateAccessAndRefreshTokens(user?._id);

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshtoken, options)
      .json(
        new apiResponse(
          200,
          { accessToken, newRefreshtoken, userId },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new apiError(401, (error as string) || "Invalid refresh token");
  }
});

export { registerUser, loginUser, logOutUser, refreshAccessToken };
