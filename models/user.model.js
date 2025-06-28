import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  faceId: {
    type: [Number],
       required: true,
    unique: true, // Optional: prevent duplicate face IDs
  },
  name: {
    type: String,
   
  }
});

const User = mongoose.model("User", userSchema);

export default User;
