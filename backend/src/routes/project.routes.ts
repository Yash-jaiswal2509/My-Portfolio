import { Router } from "express";
import { addProject, fetchProjects } from "../controllers/projects.controller";
import { upload } from "../middlewares/multer.middleware";
import { verifyRoles } from "../middlewares/verifyRoles.middleware";
import { verifyJwt } from "../middlewares/auth.middleware";

const router = Router();

router.post("/add-project", upload.array("projectImages"), addProject);
router.get("/", verifyJwt, verifyRoles(["admin", "user"]), fetchProjects);

export default router;
