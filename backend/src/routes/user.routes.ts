import { Request, Router, Response } from "express";
import {
  logOutUser,
  loginUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/users.controller";
import { upload } from "../middlewares/multer.middleware";
import { verifyJwt } from "../middlewares/auth.middleware";
import { verifyAdmin } from "../middlewares/admin.middleware";

const router = Router();
router.post("/register", upload.array("coverImage"), registerUser);

router.post("/login", loginUser);

//secured through middleware
router.post("/logout", verifyJwt, logOutUser);

//check for the user
router.post("/protected-route", verifyJwt, refreshAccessToken);

//check for admin
router.post("/admin-route", verifyAdmin);

export default router;
