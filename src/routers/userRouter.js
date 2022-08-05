import express from "express";

// Import Controllers and Middlewares
import { deleteUser, getUser, postCreateUser } from "../controllers/userControllers";

const userRouter = express.Router();

// Routeing
userRouter.route("/").post(postCreateUser).delete(deleteUser);
userRouter.route("/:username").get(getUser);

export default userRouter;
