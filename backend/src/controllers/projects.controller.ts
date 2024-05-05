import { Request, Response } from "express";
import { Project } from "../models/project.model";
import { apiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

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
