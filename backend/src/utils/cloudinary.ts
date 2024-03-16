import { NextFunction, Request, Response } from "express";
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from "cloudinary";
import sharp from "sharp";
import "dotenv/config";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

interface CloudinaryFile extends Express.Multer.File {
  buffer: Buffer;
}

export const uploadToCloudinary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files: CloudinaryFile[] = req.files as CloudinaryFile[];
    if (!files || files.length === 0) {
      //If the files is not provided then proceed to next middleware
      return next(new Error("No files provided"));
    }

    const cloudinaryUrls: string[] = [];
    for (const file of files) {
      const resizedBuffer: Buffer = await sharp(file.buffer)
        .resize({
          width: 800,
          height: 800,
        })
        .toBuffer();

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "portfolio-images",
        } as any,
        (
          err: UploadApiErrorResponse | undefined,
          result: UploadApiResponse | undefined
        ) => {
          if (err) {
            console.error("Cloudinary upload error:", err);
            return next(err);
          }
          if(!result){
            console.error("Cloudinary upload error: Result is undefined")
            return next(new Error("Cloudinary upload result is undefined"))
          }

          cloudinaryUrls.push(result.secure_url)
          if(cloudinaryUrls.length === files.length){
            req.body.cloudinaryUrls = cloudinaryUrls;
            next();
          }
        }
      );
      uploadStream.end(resizedBuffer);
    }
  } catch (error) {
    console.error("Error in uploadToCloudinary middleware",error)
    next(error);
  }
};
