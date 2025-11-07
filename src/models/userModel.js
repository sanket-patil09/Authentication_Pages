import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: "string",
    required: [true, "Provide a username"],
    unique: true,
  },
  email: {
    type: "string",
    required: [true, "Provide an email"],
    unique: true,
  },
  password: {
    type: "string",
    required: [true, "Provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.model.users || mongoose.model("User", userSchema);

export default User;
