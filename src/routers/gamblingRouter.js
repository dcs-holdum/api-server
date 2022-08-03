import express from "express";

// Import Controllers and Middlewares

const gamblingRouter = express.Router();

// Routeing
gamblingRouter.route("/").get();
gamblingRouter.route("/check/:userId").get();
gamblingRouter.route("/gambling/:money/:userId").post();

export default gamblingRouter;
