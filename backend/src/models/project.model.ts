import mongoose from "mongoose";
import { ProjectType } from "../shared/types";

const projectSchema = new mongoose.Schema<ProjectType>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    projectImages: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model<ProjectType>("Projects", projectSchema);
