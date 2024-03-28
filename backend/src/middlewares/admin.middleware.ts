import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.model";
import { apiError } from "../utils/apiError";
import { apiResponse } from "../utils/apiResponse";

export const verifyAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    //alternately only _id would have been enough
    if (
      username !== "yashjaiswal0825" &&
      email !== "yashjaiswal2509@gmail.com" &&
      password !== "#Theowner082502"
    ) {
      throw new Error("Only Admin is allowed");
    }

    const admin = await User.findOne({
      $or: [{ username }, { email }, { password }],
    });

    if (!admin) {
      throw new apiError(401, "Something wrong in fetching admin data");
    }

    res.status(200).json(new apiResponse(200, "Welcome admin!!"));
  }
);
