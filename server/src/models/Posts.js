import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
  poster: {type: String, required: true, unique: true},
  post_content: {type: String, required: true, unique: true}
})

export const PostModel = mongoose.model("posts", PostSchema);