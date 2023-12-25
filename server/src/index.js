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

mongoose.connect(process.env.MONGODB_URL);

app.use("/create-posts", postsRouter);
app.use("/auth-users", userRouter);

app.listen(3001, () => console.log("server started"));
