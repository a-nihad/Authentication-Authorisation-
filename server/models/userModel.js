import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

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

// Encrypt password
userSchema.pre("save", async function (next) {
  // only run this function if password was Modified or Create
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete confirmPassword
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
