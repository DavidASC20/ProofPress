import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

import { postsRouter } from "./routes/posts.js";
import { userRouter } from "./routes/users.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://user1:user1_1234@cluster0.cmfvafi.mongodb.net/");

app.use("/create-posts", postsRouter);
// app.use("/auth-users", userRouter);

app.listen(3001, () => console.log("server started"));
