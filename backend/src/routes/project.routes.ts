import { Router } from "express";
import { createProject } from "../controllers/projects.controller";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

router.post(
  "/projects",
  upload.array("imageFiles"),
  createProject
);
