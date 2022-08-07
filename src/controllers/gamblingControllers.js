// Import Models
import User from "../models/User";
import History from "../models/History";
import GamblingHistory from "../models/GablingHistory";

// IMport Libraries
import { increaseByPercentage } from "../lib/random";

export const getGabling = (_, res) => {
  return res.send("Developing... getGabling");
};

export const getCheckGambling = async (req, res) => {
  // Grab the variable from the params
  const {
    params: { username }
  } = req;

  // Check user exists
  const isExists = await User.exists({ username });
  if (!isExists) return res.sendStatus(404);

  // If user exists, grab all of the User information form the mongoDB and populate the gambling history array
  const userInfo = await User.findById(isExists["_id"]).populate({
    path: "history",
    populate: {
      path: "gambling",
    },
  });

  // Return json
  // Ref) https://github.com/dcs-holdum/.github/blob/master/docs/API_EXAMPLE/GAMBLING/CHECK.json
  return res.json({
    histroy: userInfo.history.gambling.reverse(),
  });
};

export const postGambling = async (req, res) => {
  // Grab the variables from the params
  const {
    params: { money: bettingMoney, username }
  } = req;

  // Check user exists
  const isExists = await User.exists({ username });
  if (!isExists) return res.sendStatus(404);

  // If user exists, grab all of the User information from the mongoDB
  const userInfo = await User.findById(isExists["_id"]);

  // If the betted money is bigger then the money that user has, return status code to kill this function
  if (bettingMoney > userInfo.money) {
    return res.sendStatus(403);
  }

  // If not, run this library to get the results about betting
  const results = increaseByPercentage(process.env.MIN_PERCENTAGE, bettingMoney);

  // Increase the money of the user
  await User.findByIdAndUpdate(userInfo["_id"], {
    $inc: {
      money: results.money,
    },
  });

  // Create Gambling History
  const createdGamblingHistory = await GamblingHistory.create({
    spend: bettingMoney,
    earn: results.money - bettingMoney,
    percentage: results.percentage,
    success: results.isWin,
    user: userInfo["_id"],
  });

  // Push to history
  await History.findByIdAndUpdate(userInfo.history["_id"], {
    $push: {
      gambling: createdGamblingHistory["_id"],
    },
  });

  // Return json
  // Ref) https://github.com/dcs-holdum/.github/blob/master/docs/API_EXAMPLE/GAMBLING/GAMBLING.json
  return res.json({
    time: createdGamblingHistory.time,
    money: createdGamblingHistory.spend,
    earn: createdGamblingHistory.earn,
    percentage: createdGamblingHistory.percentage,
  })
};
