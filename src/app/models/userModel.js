import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userProfile: {
    type: String,
    required: true
  }
  // isVerified: Boolean,
  // isAdmin: Boolean,
  // forgotPasswordToken: String,
  // forgotPasswordTokenExpiry: Date,
  // verifyToken: String,
  // verifyTokenExpiry: Date
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
