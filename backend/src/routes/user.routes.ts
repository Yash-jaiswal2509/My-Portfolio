import { Router } from "express";
import {
  logOutUser,
  loginUser,
  registerUser,
} from "../controllers/users.controller";
import { upload } from "../middlewares/multer.middleware";
import { verifyJwt } from "../middlewares/auth.middleware";

const router = Router();
router.post("/register", upload.single("coverImage"), registerUser);

router.post("/login", loginUser);

//secured through middleware
router.post("/logout", verifyJwt, logOutUser);
export default router;
