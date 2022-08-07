import User from "../models/User";
import History from "../models/History";
import GamblingHistory from "../models/GablingHistory";
import { increaseByPercentage } from "../lib/random";

export const getGabling = (_, res) => {
  return res.send("Developing... getGabling");
};

export const getCheckGambling = async (req, res) => {
  const {
    params: { username }
  } = req;

  const isExists = await User.exists({ username });

  if (!isExists) return res.sendStatus(404);

  const userInfo = await User.findById(isExists["_id"]).populate({
    path: "history",
    populate: {
      path: "gambling",
    },
  });

  return res.json({
    histroy: userInfo.history.gambling.reverse(),
  });
};

export const postGambling = async (req, res) => {
  const {
    params: { money: bettingMoney, username }
  } = req;

  const isExists = await User.exists({ username });

  if (!isExists) return res.sendStatus(404);

  const userInfo = await User.findById(isExists["_id"]);

  if (bettingMoney > userInfo.money) {
    return res.sendStatus(403);
  }

  const results = increaseByPercentage(process.env.MIN_PERCENTAGE, bettingMoney);

  await User.findByIdAndUpdate(userInfo["_id"], {
    $inc: {
      money: results.money,
    },
  });

  const createdGamblingHistory = await GamblingHistory.create({
    spend: bettingMoney,
    earn: results.money - bettingMoney,
    percentage: results.percentage,
    success: results.isWin,
    user: userInfo["_id"],
  });

  await History.findByIdAndUpdate(userInfo.history["_id"], {
    $push: {
      gambling: createdGamblingHistory["_id"],
    },
  });

  return res.json({
    time: createdGamblingHistory.time,
    money: createdGamblingHistory.spend,
    earn: createdGamblingHistory.earn,
    percentage: createdGamblingHistory.percentage,
  })
};
