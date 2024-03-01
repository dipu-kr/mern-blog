import Post from "../models/post.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const blogpost = async (req, res) => {
  console.log("req data", req.body);

  res.send(req.body);
  // const { userId, title, description } = req.body;
  // if (
  //   !title ||
  //   !description ||
  //   title.trim() === "" ||
  //   description.trim() === ""
  // ) {
  //   return res.status(400).json({ message: "All fields are required" });
  // }

  // const blogImgLocalPath = req.files[0].photo.path;

  // if (!blogImgLocalPath) {
  //   res.status(400).json({ status: 400, message: "Blog image is required" });
  // }
  // const blogImage = await uploadOnCloudinary(blogImgLocalPath);

  // try {
  //   const newPost = new Post({
  //     userId,
  //     title,
  //     description,
  //     photo: blogImage.url,
  //   });
  //   await newPost.save();

  //   return res
  //     .status(200)
  //     .json({ message: "Blog Posted successfully!", status: 200 });
  // } catch (error) {
  //   console.log("server error", error);
  //   return res.status(500).json({ message: "Server Error!", status: 500 });
  // }
};
