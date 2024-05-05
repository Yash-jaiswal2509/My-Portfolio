import { Router } from "express";
import { fetchProjects } from "../controllers/projects.controller";

const router = Router();

router.get("/", fetchProjects);

export default router;
