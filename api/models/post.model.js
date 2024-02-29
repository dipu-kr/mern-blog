import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  paragraph: {
    type: String,
    required: true,
  },
  // photo: {
  //   type: String,
  //   required: true,
  // },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
