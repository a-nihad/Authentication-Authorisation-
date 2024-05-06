import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [4, "Password must be above 4 characters"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Password are not the same!",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});
const User = mongoose.model("User", userSchema);

export default User;
