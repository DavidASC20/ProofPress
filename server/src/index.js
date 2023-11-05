import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';

import { postRouter } from "./routes/posts.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://user1:for_pp@cluster0.cmfvafi.mongodb.net/");

app.use("/create-posts", postRouter);

app.listen(3003, () => console.log("server started"));
