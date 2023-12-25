// route to register users and creates a session, etc.
import express from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/Users.js';

const router = express.Router();




export { router as userRouter};