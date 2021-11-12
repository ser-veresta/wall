import express from "express";
import protect from "../middleware/auth.js";

const router = express.Router();

import { getUser, loginUser, createUser, activate, forgotPassword, resetPassword } from "../controllers/user.js";

//@route POST /api/user/
//@desc to get user data
//@access private
router.get("/", protect, getUser);

//@route POST /api/user/login
//@desc to handle user login
//@access public
router.post("/login", loginUser);

//@route POST /api/user/create
//@desc to create ne user
//@access public
router.post("/create", createUser);

router.route("/activate/:activeToken").get(activate);

router.route("/forgotPassword").post(forgotPassword);

router.route("/resetPassword/:resetToken").patch(resetPassword);

export default router;
