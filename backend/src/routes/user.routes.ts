import { Router } from "express";
import {
  logOutUser,
  loginUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/users.controller";
import { upload } from "../middlewares/multer.middleware";
import { verifyJwt } from "../middlewares/auth.middleware";

const router = Router();
router.post("/register", upload.array("coverImage"), registerUser);

router.post("/login", loginUser);

//secured through middleware
router.post("/logout", verifyJwt, logOutUser);

//check for the user
router.post("/protected-route", verifyJwt, refreshAccessToken);

export default router;
