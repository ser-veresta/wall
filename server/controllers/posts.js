import { Posts } from "../models/post.js";
import ErrorResponse from "../utils/errorResponse.js";

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Posts.find();

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (err) {
    next(err);
  }
};

export const createPosts = async (req, res, next) => {
  const post = req.body;

  const newPost = new Posts(post);
  try {
    await newPost.save();

    res.status(201).json({
      success: true,
      data: newPost,
    });
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { title, message, tags, image } = req.body;

  try {
    const post = await Posts.findById(id);

    if (!post) return next(new ErrorResponse("No user with the given id", 404));

    post.title = title;
    post.message = message;
    post.tags = tags;
    post.image = image;

    await post.save();

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    next(err);
  }
};

export const likePost = async (req, res, next) => {
  const { id } = req.params;
  const { type } = req.body;
  const { username: name } = req.body.user;

  try {
    const post = await Posts.findById(id);

    if (!post) return next(new ErrorResponse("No user with the given id", 404));

    console.log(post);

    if (post.voteId.incre.includes(name)) {
      post.voteId.incre = post.voteId.incre.filter((ele) => ele !== name);
      if (type === "incre") {
        post.vote = post.vote - 1;
      } else {
        post.voteId.decre.push(name);
        post.vote = post.vote - 2;
      }
    } else if (post.voteId.decre.includes(name)) {
      post.voteId.decre = post.voteId.decre.filter((ele) => ele !== name);
      if (type === "incre") {
        post.voteId.incre.push(name);
        post.vote = post.vote + 2;
      } else {
        post.vote = post.vote + 1;
      }
    } else {
      if (type === "incre") {
        post.vote = post.vote + 1;
        post.voteId.incre.push(name);
      } else {
        post.vote = post.vote - 1;
        post.voteId.decre.push(name);
      }
    }

    await post.save();

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = Posts.findById(id);

    if (!post) return next(new ErrorResponse("No user with the given id", 404));

    await post.remove();

    res.status(200).json({ success: true, data: id });
  } catch (err) {
    next(err);
  }
};
