import express from "express";

// Import Controllers and Middlewares
import { getCheckLevel, patchLevelUp } from "../controllers/levelControllers";

const levelRouter = express.Router();

// Routeing
levelRouter.route("/check/:username").get(getCheckLevel);
levelRouter.route("/up/:username").patch(patchLevelUp);

export default levelRouter;
