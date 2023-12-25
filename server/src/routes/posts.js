import express from "express";
import mongoose from "mongoose";
import { PostModel } from "../models/Posts.js";

const router = express.Router();

// get all recipes in the database
router.get("/get", async (req, res) => {
  try {
    const response = await PostModel.find({});
    res.json(response);
  } catch(err) {
    res.json(err);
  }
})


// use axios later to receive data from frontend
// data should include users ethereum address and the post content
router.post("/create", async(req, res) => {
  const {ethereum_address, post_content} = req.body;
  const new_post = new PostModel({ethereum_address, post_content});
  await new_post.save();
  res.json("post registered successfully");

  // console.log("trying to create a new post here");
  // const post = new PostModel(req.body);
  // try {
  //   console.log("trying to save");
  //   const response = await post.save();
  //   console.log("saved");
  //   res.json(response);
  // } catch(err) {
  //   res.json(err);
  // }
});

export { router as postsRouter };
