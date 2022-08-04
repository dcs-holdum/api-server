import express from "express";

// Import Controllers and Middlewares
import { getMoney, getCheckMoney, postEarnMoney, postLoseMoney } from "../controllers/moneyControllers";

const moneyRouter = express.Router();

// Routeing
moneyRouter.route("/").get(getMoney);
moneyRouter.route("/check/:username").get(getCheckMoney);
moneyRouter.route("/earn/:username").post(postEarnMoney);
moneyRouter.route("/lose/:username").post(postLoseMoney);

export default moneyRouter;
