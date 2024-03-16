import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
  secure: true,
});

const uploadToCloudinary = async (localFilePath: Express.Multer.File) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath.path, {
      resource_type: "auto",
      folder: "portfolio-images"
    });
    // file has been uploaded successfull
    console.log("file is uploaded on cloudinary:", response.url);
    return response;
  } catch (error) {
    // remove the locally saved temporary file as the upload operation got failed
    fs.unlinkSync(localFilePath.path);
    return null;
  }
};

export { uploadToCloudinary };
