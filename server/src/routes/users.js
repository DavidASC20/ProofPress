// route to register users and creates a session, etc.
import express from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/Users.js';

const router = express.Router();

/* there really isnt a "register" since anyone can just 
login in with metamask and create posts and it will be 
registered to their wallet address

this login route is just to add first timers to the database
so that we can associate their posts with their address
*/
router.post("/login", async (req, res) => {
  // message from frontend should just be the address
  const { ethereum_address } = req.body;
  const user = await UserModel.findOne({ ethereum_address });

  if(user){
    return res.json({ message: "user already exists!" });
  }
  const new_user = new UserModel({ ethereum_address });
  await new_user.save();
  res.json({ message: "new user has been added to the database!" });
});


export { router as userRouter};