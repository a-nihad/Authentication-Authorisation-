import express from "express";
import {
  login,
  protect,
  signup,
  updateMe,
  updatePassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.patch("/updateMyPassword", protect, updatePassword);
router.patch("/updateMe", protect, updateMe);

export default router;
