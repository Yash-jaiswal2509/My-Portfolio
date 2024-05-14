import { Router } from "express";
import {
  fetchProjects,
  individualProject,
} from "../controllers/projects.controller";

const router = Router();

router.get("/", fetchProjects);
router.get("/:projectId", individualProject);

export default router;
