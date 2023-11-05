import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';

import { postRouter } from "./routes/posts.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("create-posts", postRouter);

mongoose.connect();

app.listen(3001, () => console.log("server started"));