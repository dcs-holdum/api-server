import express from "express";

// Import Controllers and Middlewares
import { getMoney, getCheckMoney, patchEarnMoney, patchLoseMoney } from "../controllers/moneyControllers";

const moneyRouter = express.Router();

// Routeing
moneyRouter.route("/").get(getMoney);
moneyRouter.route("/check/:username").get(getCheckMoney);
moneyRouter.route("/earn/:username").patch(patchEarnMoney);
moneyRouter.route("/lose/:username").patch(patchLoseMoney);

export default moneyRouter;
