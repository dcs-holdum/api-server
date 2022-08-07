import express from "express";

// Import Controllers and Middlewares
import {
  getGabling,
  getCheckGambling,
  postGambling,
} from "../controllers/gamblingControllers";

const gamblingRouter = express.Router();

// Routeing
gamblingRouter.route("/").get(getGabling);
gamblingRouter.route("/check/:username").get(getCheckGambling);
gamblingRouter.route("/gambling/:money/:username").post(postGambling);

export default gamblingRouter;
