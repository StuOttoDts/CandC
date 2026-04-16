import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import { getUserById } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);


router.get("/:id", getUserById);

export default router;