import { promisify } from "util";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";

export const signup = async (req, res, next) => {
  try {
    const { fullName, email, password, passwordConfirm, passwordChangedAt } =
      req.body;

    const newUser = await User.create({
      fullName,
      email,
      password,
      passwordConfirm,
      passwordChangedAt,
    });

    // JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({
      status: "success",
      message: "Registration is successfully",
      token,
      user: newUser,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password axist
    if (!email || !password)
      return next(new AppError("Please provide email and password", 400));

    // 2) Check if user exists
    const user = await User.findOne({ email });

    if (!user)
      return next(
        new AppError("This user does not exist, please sign up", 400)
      );

    // 3) Check Password is correct
    if (!(await user.correctPassword(password, user.password)))
      return next(new AppError("Incorrect email or password", 401));

    // 4) IF everything ok, send token to clint
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      user,
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

export const protect = async (req, res, next) => {
  try {
    // 1) Getting token and check of it's there
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token)
      return next(
        new AppError("You are not logged in! please login to get access.", 400)
      );

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser)
      return next(
        new AppError(
          "The user beloging to this token does no longer exist.",
          400
        )
      );

    // 4) Check if user changed password after token was issued
    if (currentUser.changePasswordAfter(decoded.iat))
      return next(
        new AppError("User recently changed password! Please login again", 400)
      );

    // Grant access to protected route
    req.user = currentUser;

    next();
  } catch (err) {
    console.log(err);
  }
};

export const restictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError("You do not have permission to perform this action", 400)
      );

    next();
  };
};

export const updatePassword = async (req, res, next) => {
  try {
    // 1) Get user from collection
    const user = await User.findById(req.user.id);

    // 2) Check if POSTed password is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password)))
      return next(new AppError("Your current password is wrong", 400));

    // 3) If correct, Update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;

    await user.save();

    // 4) send JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateMe = async (req, res, next) => {
  try {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm)
      return next(
        new AppError(
          "This route is not for update password. Please use /upateMyPassword",
          400
        )
      );

    // 2) Create error if user POSTs role data
    if (req.body.role)
      return next(new AppError("Cannot update user role", 400));

    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      message: "User data updated",
      data: updatedUser,
    });
  } catch (err) {
    console.log(err);
  }
};

// Delete user :- it doesn't actually delete but inactive user for future use
export const deleteMe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(200).json({
      status: "success",
      message: "User deleted",
      data: null,
    });
  } catch (err) {
    console.log(err);
  }
};
