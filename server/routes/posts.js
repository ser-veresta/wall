import express from "express";
import { createPosts, deletePost, getPosts, likePost, updatePost } from "../controllers/posts.js";

//importing auth
import protect from "../middleware/auth.js";

const router = express.Router();

// @route GET api/post/
// @desc to get posts
// @access public
router.get("/", getPosts);

// @route POST api/post/create
// @desc to create post
// @access private
router.post("/create", protect, createPosts);

// @route PATCH api/post/update/:id
// @desc to update a post
// @access private
router.patch("/update/:id", protect, updatePost);

// @route PATCH api/post/like/:id
// @desc to like a post
// @access private
router.patch("/like/:id", protect, likePost);

// @route DELETE api/post/delete/:id
// @desc to delete a post
// @access private
router.delete("/delete/:id", protect, deletePost);

export default router;
