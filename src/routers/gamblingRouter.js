import express from "express";

// Import Controllers and Middlewares
import { getGabling, getCheckGambling, postGambling } from "../controllers/gamblingControllers";

const gamblingRouter = express.Router();

// Routeing
gamblingRouter.route("/").get(getGabling);
gamblingRouter.route("/check/:userId").get(getCheckGambling);
gamblingRouter.route("/gambling/:money/:userId").post(postGambling);

export default gamblingRouter;
