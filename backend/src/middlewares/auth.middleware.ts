import { User } from "../models/user.model";
import { apiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

//This is done just to remove the error for req.user = user;
declare module "express" {
  interface Request {
    user?: any;
    roles?: string[];
  }
}

export const verifyJwt = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //provided cookie parser
    try {
      //replacing "Bearer " with empty string as send in header
      const token = req.header("Authorization")?.replace("Bearer ", "");
      
      if (!token) {
        throw new apiError(401, "Unauthorized request");
      }

      //verifying with access token
      //remember to assign decoded token as JwtPayload cause -> can't access id from string
      const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as Secret
      ) as JwtPayload;

      const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );

      if (!user) {
        throw new apiError(401, "Invalid access token");
      }

      //assigning user and roles in req
      req.user = user;
      req.roles = user.roles;
      next();
    } catch (error) {
      throw new apiError(401, (error as string) || "Invalid access token");
    }
  }
);
