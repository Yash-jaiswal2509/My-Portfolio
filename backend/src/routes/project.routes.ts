import { Router } from "express";
import { addProject } from "../controllers/projects.controller";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

router.post("/add-projects", upload.array("projectImages"), addProject);

export default router;
