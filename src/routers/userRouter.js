import express from "express";

// Import Controllers and Middlewares
import { postCreateUser } from "../controllers/userControllers";

const userRouter = express.Router();

// Routeing
userRouter.route("/").post(postCreateUser);

export default userRouter;
