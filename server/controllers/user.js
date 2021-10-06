import { Users } from "../models/user.js";
import ErrorResponse from "../utils/errorResponse.js";

export const getUser = async (req, res) => {
  const user = req.body.user;

  res.status(200).json({ success: true, data: user });
};

export const loginUser = async (req, res, next) => {
  const { name } = req.body;

  if (name.toLowerCase() === "admin") return next(new ErrorResponse("Your not an Admin", 400));

  try {
    const user = await Users.findOne({ name });

    if (!user) return next(new ErrorResponse("user not found", 404));

    const token = user.generateToken();

    res.status(200).json({ success: true, data: token });
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  const { name } = req.body;

  const user = new Users({ name });
  try {
    await user.save();

    const token = user.generateToken();

    res.status(201).json({ success: true, data: token });
  } catch (err) {
    next(err);
  }
};
