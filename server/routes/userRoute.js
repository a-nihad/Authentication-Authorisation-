import express from "express";
import { getUsers } from "../controllers/userController.js";
import { protect } from "../controllers/authController.js";

const router = express.Router();

router.route("/").get(protect, getUsers);

export default router;
