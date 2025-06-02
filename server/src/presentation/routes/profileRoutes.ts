import express from "express";

import { authMiddleWare } from "../../middlewares/authMiddleware";
import { FileUpload } from "../../shared/utils/multerService";
import { ProfileController } from "../controllers/profileController";

const router = express.Router();

const uploadOptions = {
  fileTypes: ["jpg", "jpeg", "png"],
  fileSizeLimit: 5 * 1024 * 1024,
  uploadDir: `blogs`,
};

const fileUpload = new FileUpload(uploadOptions);

const profileController = new ProfileController();

router.patch(
  "/",
  authMiddleWare(),
  fileUpload.uploadFile("avatar"),
  profileController.updateProfile
);

export default router;
