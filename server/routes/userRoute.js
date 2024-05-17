import express from "express";
import { getUsers } from "../controllers/userController.js";
import { protect, restictTo } from "../controllers/authController.js";

const router = express.Router();

router.route("/").get(getUsers);
// router.route("/").get(protect, restictTo("admin"), getUsers);

export default router;
