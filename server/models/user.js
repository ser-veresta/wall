import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
});

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const Users = mongoose.model("user", userSchema);
