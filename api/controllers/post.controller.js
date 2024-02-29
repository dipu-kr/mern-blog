import Post from "../models/post.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const post = async (req, res) => {
  // res.send("hello");
  console.log("req data", req.body);
  res.status(400).json({ message: "hello" });
  // const { userId, title, paragraph } = req.body;
  // if (!title || !paragraph || title.trim() === "" || paragraph.trim() === "") {
  //   return res.status(400).json({ message: "All fields are required" });
  // }

  // const blogImgLocalPath = req.file?.photo[0]?.path;
  // if (!blogImgLocalPath) {
  //   res.status(400).json({ status: 400, message: "Blog image is required" });
  // }

  // const blogImage = await uploadOnCloudinary(blogImgLocalPath);
  // try {
  //   const newPost = new Post({
  //     userId,
  //     title,
  //     paragraph,
  //     photo: blogImage.url,
  //   });
  //   await newPost.save();
  //   return res
  //     .status(200)
  //     .json({ message: "Blog Posted successfully!", status: 200 });
  // } catch (error) {
  //   return res.status(500).json({ message: "Server Error!", status: 500 });
  // }
};
