import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  createdBy: String,
  tags: [String],
  image: String,
  vote: {
    type: Number,
    default: 0,
  },
  voteId: {
    incre: { type: [String], default: [] },
    decre: { type: [String], default: [] },
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const Posts = mongoose.model("post", postSchema);
