import multer, { Multer } from "multer";
import { Request } from "express";

const storage = multer.memoryStorage();
//initialized multer-generates a middleware for storing files temporary before uploading it to the cloudinary
export const upload: Multer = multer({ storage: storage });
