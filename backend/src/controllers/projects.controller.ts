import { Request, Response } from "express";
import { apiError } from "../utils/apiError";
import { Project } from "../models/project.model";
import { uploadToCloudinary } from "../utils/cloudinary";
import { apiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const addProject = asyncHandler(async (req: Request, res: Response) => {
  const { title, description } = req.body;

  if ([title, description].some((field) => field?.trim() === "")) {
    throw new apiError(400, "All fields are required");
  }

  const existingProject = await Project.findOne({
    $or: [{ title }],
  });

  if (existingProject) {
    throw new apiError(409, "Project already exists");
  }

  const projectImagePath = req.files as Express.Multer.File[];

  if (!projectImagePath) {
    throw new apiError(400, "Project image is required");
  }

  const projectImages = await uploadToCloudinary(projectImagePath);

  if (!projectImages) {
    throw new apiError(500, "Failed to upload project image(s)");
  }
  const projectImageUrls = projectImages.map((image) => image.url);

  const project = await Project.create({
    title,
    description,
    projectImages: projectImageUrls,
  });

  await project.save();

  const createdProject = await Project.findById(project._id);

  if (!createdProject) {
    throw new apiError(500, "Something went worng while finding project");
  }

  res
    .status(201)
    .json(new apiResponse(200, createdProject, "Project added successfully"));
});
