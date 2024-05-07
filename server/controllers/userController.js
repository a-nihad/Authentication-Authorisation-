import User from "../models/userModel.js";

export const getUsers = async (req, res, next) => {
  try {
    const user = await User.find();

    res.status(200).json({
      status: "success",
      result: user.length,
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
