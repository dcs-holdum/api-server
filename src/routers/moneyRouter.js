import express from "express";

// Import Controllers and Middlewares
import { getMoney, getCheckMoney, postEarnMoney, postLoseMoney } from "../controllers/moneyControllers";

const moneyRouter = express.Router();

// Routeing
moneyRouter.route("/").get(getMoney);
moneyRouter.route("/check/:userId").get(getCheckMoney);
moneyRouter.route("/earn/:userId").post(postEarnMoney);
moneyRouter.route("/lose/:userId").post(postLoseMoney);

export default moneyRouter;
