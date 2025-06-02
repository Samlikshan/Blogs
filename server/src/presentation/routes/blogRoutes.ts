import express from "express";
import { BlogController } from "../controllers/blog/blogController";
import { authMiddleWare } from "../../middlewares/authMiddleware";
import { FileUpload } from "../../shared/utils/multerService";

const router = express.Router();
const blogController = new BlogController();

const uploadOptions = {
  fileTypes: ["jpg", "jpeg", "png"],
  fileSizeLimit: 5 * 1024 * 1024,
  uploadDir: `blogs`,
};

const fileUpload = new FileUpload(uploadOptions);

router.get("/", blogController.listAllBlogs);
router.patch(
  "/:blogId",
  fileUpload.uploadFile("blog-image"),
  authMiddleWare(),
  blogController.updateBlog
);
router.post(
  "/",
  fileUpload.uploadFile("blog-image"),
  authMiddleWare(),
  blogController.createBlog
);
router.get("/profile", authMiddleWare(), blogController.listUserBlogs);
router.get("/:blogId", blogController.blogDetails);
router.delete("/:blogId", authMiddleWare(), blogController.deleteBlog);

export default router;
