import { Router } from "express";
import { addProject, fetchProjects } from "../controllers/projects.controller";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

router.post("/add-project", upload.array("projectImages"), addProject);
router.get("/", fetchProjects);

export default router;
