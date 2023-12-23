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

  }
})

router.post("/create", async(req, res) => {
  const post = new PostModel(req.body);
  try {
    const response = await post.save();
    res.json(response);
  } catch(err) {

  }
});

export { router as postsRouter };
