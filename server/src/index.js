import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';

import { postRouter } from "./routes/posts.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect();

app.use("/create-posts", postRouter);

app.listen(3001, () => console.log("server started"));
