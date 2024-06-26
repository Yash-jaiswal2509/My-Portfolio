import { Request, Response, NextFunction } from "express";
import { apiError } from "../utils/apiError";

export const verifyRoles = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    //check if user has the required role
    const hasRole = roles.some((role) => req.roles?.includes(role));
    if (!hasRole) {
      throw new apiError(403, "You don't have permission to access this route");
    }
    next();
  };
};
