import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import errorHandler from "./middleware/error.js";

//importing the routes
import postRouter from "./routes/posts.js";
import userRouter from "./routes/users.js";

//initializing the express app
const app = express();

//setting the PORT
const port = process.env.PORT || 5000;

//corse for cross origin requests
app.use(cors({ origin: process.env.CLIENT_URI }));

//middleware to parse json body
app.use(express.json());

if (process.env.ENVIRONMENT === "dev") {
  //setting up logger for dev env
  app.use(morgan("dev"));
}

//routes
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

//error handling
app.use(errorHandler);

//connecting to mongoDB and starting the server
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port, () => console.log(`Server started in PORT:${port}`)))
  .catch((err) => console.log(err.message));
