import { error } from "console";
import { Request } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ): void => {
    cb(null, "./public/temp");
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ): void => {
    cb(null, file.originalname);
  },
});

/* 
initialized multer:-
generates a middleware for storing files temporary before uploading it to the cloudinary 
*/
export const upload = multer({ storage: storage });
