import express from "express";

// Import Controllers and Middlewares
import { getLevel, getCheckLevel, postLevelUp } from "../controllers/levelControllers";

const levelRouter = express.Router();

// Routeing
levelRouter.route("/").get(getLevel);
levelRouter.route("/check/:username").get(getCheckLevel);
levelRouter.route("/up/:username").post(postLevelUp);

export default levelRouter;
