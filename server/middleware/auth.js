import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/errorResponse.js";
import { Users } from "../models/user.js";

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    token = req.headers.authorization;
  }

  if (!token) return next(new ErrorResponse("Not Authorized", 401));

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Users.findById(id);

    if (!user) return next(new ErrorResponse("User Not Found", 404));

    req.body.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default protect;
