import mongoose from "mongoose";
import mongooseAggregatePagonate from "mongoose-aggregate-paginate-v2"


const projectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, },
        video: { type: String, },//Cloudinary
        image: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export const Project = mongoose.model("Projects", projectSchema);