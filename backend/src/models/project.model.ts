import mongoose from "mongoose";
import { ProjectType } from "../shared/types";

const projectSchema = new mongoose.Schema<ProjectType>(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true },
    projectImages: [{ type: String, required: true }],
    deploymentLink: { type: String },
    githubLink: { type: String },
    featured: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model<ProjectType>("Projects", projectSchema);
