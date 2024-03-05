import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string
});

const uploadCloudinary = async (localFilePAth) => {
    try {
        if (!localFilePAth) return null;
        const response = await cloudinary.uploader.upload(localFilePAth, {
            resource_type: "auto"
        })

        console.log("File is uploaded on cloudinary!!", response.url);

        return response;
    } catch (error) {
        fs.unlinkSync(localFilePAth)
        // removing temp local file which got saved while upload failed
        return null
    }
}

export { uploadCloudinary };