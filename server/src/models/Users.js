// stores uses ethereum address and their posts
// credit/token stuff will be added later on

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  ethereum_address: {type: String, required: true}
})

export const UserModel = mongoose.model("users", UserSchema);