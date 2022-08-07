import express from "express";

// Import Controllers and Middlewares
import {
  getUser,
  postCreateUser,
  deleteUser,
} from "../controllers/userControllers";

const userRouter = express.Router();

// Routeing
userRouter
  .route("/:username")
  .get(getUser)
  .post(postCreateUser)
  .delete(deleteUser);

export default userRouter;
