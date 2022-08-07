import express from "express";

// Import Controllers and Middlewares
import { getRoot } from "../controllers/rootControllers";

const rootRouter = express.Router();

// Routeing
rootRouter.route("/").get(getRoot);

export default rootRouter;
