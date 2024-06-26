import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { apiError } from "../utils/apiError";
import { Project } from "../models/project.model";
import { uploadToCloudinary } from "../utils/cloudinary";
import { apiResponse } from "../utils/apiResponse";

export const addProject = asyncHandler(async (req: Request, res: Response) => {
  const {
    title,
    shortDescription,
    longDescription,
    deploymentLink,
    githubLink,
    featured,
  } = req.body;

  console.log(
    title,
    shortDescription,
    longDescription,
    deploymentLink,
    githubLink,
    featured
  );

  if (
    [title, shortDescription, longDescription].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new apiError(400, "All fields are required");
  }

  const existingProject = await Project.findOne({
    $or: [{ title }],
  });

  if (existingProject) {
    throw new apiError(409, "Project already exists");
  }

  const projectImagePath = req.files as Express.Multer.File[];
  console.log(projectImagePath);
  if (!projectImagePath) {
    throw new apiError(400, "Project image is required");
  }

  const projectImagesURLArray = await uploadToCloudinary(projectImagePath);
  console.log(projectImagesURLArray);

  if (!projectImagesURLArray) {
    throw new apiError(500, "Failed to upload project image(s)");
  }

  const projectImageUrls = projectImagesURLArray.map((image) => image.url);
  console.log(projectImageUrls);

  const project = await Project.create({
    title,
    shortDescription,
    longDescription,
    deploymentLink,
    githubLink,
    featured,
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
