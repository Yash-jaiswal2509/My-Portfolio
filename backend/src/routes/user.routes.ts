import { Router } from "express";
import { registerUser } from "../controllers/users.controller";
import { upload } from "../middlewares/multer.middleware";

const router = Router();
router.post("/register", upload.single("coverImage"), registerUser);
export default router;
