import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  faceId: {
    type: String,
       required: true,
    unique: true, 
  },
  name: {
    type: String,
   
  }
});

const User = mongoose.model("User", userSchema);

export default User;
