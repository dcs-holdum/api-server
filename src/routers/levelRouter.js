import express from "express";

// Import Controllers and Middlewares

const levelRouter = express.Router();

// Routeing
levelRouter.route("/").get();
levelRouter.route("/check/:userId").get();
levelRouter.route("/up/:userId").post();

export default levelRouter;
