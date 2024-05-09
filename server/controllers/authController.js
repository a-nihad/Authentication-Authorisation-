import { promisify } from "util";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const signup = async (req, res, next) => {
  try {
    // const newUser = await User.create(req.body);
    const newUser = await User.create({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      passwordChangedAt: req.body.passwordChangedAt,
    });

    // JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
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
      return next(new Error("Please provide email and password"));

    // 2) Check if user exists
    const user = await User.findOne({ email });

    // 3) Check Password is correct
    if (!user || !(await user.correctPassword(password, user.password)))
      return next(new Error("Incorrect email or password"));

    // 4) IF everything ok, send token to clint
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

export const protect = async (req, res, next) => {
  try {
    // 1) Getting token and check of it's there
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token)
      return next(
        new Error("You are not logged in! please login to get access.")
      );

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser)
      return next(
        new Error("The user beloging to this token does no longer exist.")
      );

    // 4) Check if user changed password after token was issued
    if (currentUser.changePasswordAfter(decoded.iat))
      return next(
        new Error("User recently changed password! Please login again")
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
        new Error("You do not have permission to perform this action")
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
      return next(new Error("Your current password is wrong"));

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
