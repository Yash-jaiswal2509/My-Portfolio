import { Router } from "express";
import { registerUser } from "../controllers/users.controller";
import { upload } from "../middlewares/multer.middleware";

const router = Router();
router.route("/register").post(
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

export default router;
