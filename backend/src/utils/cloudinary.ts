import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
  secure: true,
});

const uploadToCloudinary = async (localFilePaths: Express.Multer.File[]) => {
  try {
    if (!localFilePaths || localFilePaths.length === 0) return null;

    const responses = await Promise.all(
      localFilePaths.map(async (file) => {
        const response = await cloudinary.uploader.upload(file.path, {
          resource_type: "auto",
          folder: "portfolio-images"
        });
        fs.unlinkSync(file.path);
        return response;
      })
    );

    return responses;
  } catch (error) {
    
    localFilePaths.forEach((file) => {
      fs.unlinkSync(file.path);
    });
    return null;
  }
};

export { uploadToCloudinary };
