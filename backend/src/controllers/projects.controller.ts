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
  console.log(title);
  console.log(description);

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

  const projectImages = await uploadToCloudinary(projectImagePath);

  console.log(projectImages);

  if (!projectImages) {
    throw new apiError(500, "Failed to upload project image(s)");
  }
  const projectImageUrls = projectImages.map((image) => image.url);
  console.log(projectImageUrls);

  const project = await Project.create({
    title,
    description,
    projectImages: projectImageUrls,
  });

  console.log(project);
  await project.save();

  const createdProject = await Project.findById(project._id);
  console.log(createdProject);

  if (!createdProject) {
    throw new apiError(500, "Something went worng while finding project");
  }

  res
    .status(201)
    .json(new apiResponse(200, createdProject, "Project added successfully"));
  console.log(res);
});

export const fetchProjects = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const projects = await Project.find();

      if (!projects || projects.length === 0) {
        res.status(404).json(new apiResponse(404, null, "No projects found"));
      }

      res
        .status(200)
        .json(new apiResponse(200, projects, "Projects fetched successfully"));
    } catch (error) {
      console.error("Error fetching projects:", error);
      res
        .status(500)
        .json(
          new apiResponse(
            500,
            null,
            "Failed to fetch projects. Please try again later."
          )
        );
    }
  }
);
