import mongoose from "mongoose";
import { ProjectType } from "../shared/types";

const projectSchema = new mongoose.Schema<ProjectType>(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrls: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model<ProjectType>("Projects", projectSchema);
