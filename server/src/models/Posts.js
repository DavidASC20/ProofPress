import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
  poster: {type: String, required: true, unique: true},
  post_content: {type: String, required: true, unique: true},
  time_stamp: {type: Date, default: Date.now }
})

export const PostModel = mongoose.model("posts", PostSchema);