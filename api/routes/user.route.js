import express from "express";
import { blogpost } from "../controllers/post.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router
  .route("/blog-post")
  .post(upload.fields([{ name: "photo", maxCount: 1 }]), blogpost);

// router.post(
//   "/blog-post",
//   upload.fields([{ name: "photo", maxCount: 1 }]),
//   blogpost
// );

export default router;
