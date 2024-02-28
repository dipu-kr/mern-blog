import express from "express";
import { test, updateUser } from "../controllers/user.controller.js";
import { post } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/test", test);
router.put("/update:userId", updateUser);
router.post("/blog-post", post);

export default router;
