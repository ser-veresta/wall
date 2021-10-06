import express from "express";
import protect from "../middleware/auth.js";

const router = express.Router();

import { getUser, loginUser, createUser } from "../controllers/user.js";

//@route POST /api/user/
//@desc to get user data
//@access private
router.get("/", protect, getUser);

//@route POST /api/user/
//@desc to handle user login
//@access public
router.post("/", loginUser);

//@route POST /api/user/create
//@desc to create ne user
//@access public
router.post("/create", createUser);

export default router;
