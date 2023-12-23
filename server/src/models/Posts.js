import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  // might have to change the gpt generated code for auth w/ meta mask later on
  
  // associate post with user who posted it, usually done with mongoose.schema.type
  poster_address: {type: String, required: true},
  post_content: {type: String, required: true}
});

export const PostModel = mongoose.model("posts", PostSchema);