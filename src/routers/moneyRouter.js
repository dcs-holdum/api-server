import express from "express";

// Import Controllers and Middlewares

const moneyRouter = express.Router();

// Routeing
moneyRouter.route("/").get();
moneyRouter.route("/check/:userId").get();
moneyRouter.route("/earn/:userId").post();
moneyRouter.route("/lose/:userId").post();

export default moneyRouter;
