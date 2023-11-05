import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  poster_address: {type: String, required: true},
  post_content: {type: String, required: true}
});

export const PostModel = mongoose.model("posts", PostSchema);