import express from "express";

// Import Controllers and Middlewares

const rootRouter = express.Router();

// Routeing
rootRouter.route("/").get();

export default rootRouter;
