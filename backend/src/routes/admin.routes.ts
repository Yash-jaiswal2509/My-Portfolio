import express from "express";
import { verifyRoles } from "../middlewares/verifyRoles.middleware";
import { verifyJwt } from "../middlewares/auth.middleware";
import { addProject } from "../controllers/admin.controller";
import { upload } from "../middlewares/multer.middleware";
import { fetchProjects } from "../controllers/projects.controller";

const router = express.Router();

router.post(
  "/add-project",
  verifyJwt,
  verifyRoles(["admin"]),
  upload.array("projectImages"),
  addProject
);

router.post("/", verifyJwt, verifyRoles(["admin"]), fetchProjects);

export default router;
