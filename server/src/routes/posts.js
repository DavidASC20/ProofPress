import express from "express";
import { PostModel } from "../models/Posts.js";

const router = express.Router();

router.post("/create", async(req, res) => {
  const {poster_address, post_content} = req.body;

  const newPost = new PostModel({poster_address, post_content});
  await newPost.save();
  res.json({message: "postt registered successfully"});
});

export { router as postRouter };