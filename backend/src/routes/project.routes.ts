import { Router } from "express";
import { addProject, fetchProjects } from "../controllers/projects.controller";
import { upload } from "../middlewares/multer.middleware";
import { verifyJwt } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/add-project",
  verifyJwt,
  upload.array("projectImages"),
  addProject
);

router.get("/", fetchProjects);

export default router;
