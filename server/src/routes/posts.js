import express, { response } from "express";
import mongoose from "mongoose";
import { PostModel } from "../models/Posts.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();

// get all recipes in the database
// this will show up on the homepage
router.get("/get_all", async (req, res) => {
  try {
    const response = await PostModel.find({});
    res.json(response);
  } catch(err) {
    res.json(err);
  }
})

// router to show a specifics users posts
router.get("get_saved/ids", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);
    res.json({saved_posts: user?.saved_posts});
  } catch(err) {
    res.json(err);
  }
})

router.get("get_saved", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);
    const saved_posts = await PostModel.find({
      _id: {$in: user.saved_posts}
    })
    res.json(saved_posts);
  } catch(err) {
    res.json(err);
  }
})

// use axios later to receive data from frontend
// data should include users ethereum address and the post content
// post requests submits data to a resource, while put requests updates something
router.post("/create", async(req, res) => {
  const {ethereum_address, post_content} = req.body;
  const new_post = new PostModel({ethereum_address, post_content});
  await new_post.save();
  res.json("post registered successfully");
});


// put request to update users saved posts
// probably need another one to delete posts
router.put("/update_saved", async(req, res) => {
  try {
    const post = await PostModel.findById(req.body.postID);
    const user = await UserModel.findById(req.body.userID);
    user.saved_posts.push(post); 
    await user.save();
    res.json({saved_posts: user.saved_posts});
  } catch(err) {
    res.json(err);
  }
});

export { router as postsRouter };