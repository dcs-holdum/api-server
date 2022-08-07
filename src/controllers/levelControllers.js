// Import Models
import User from "../models/User";
import History from "../models/History";
import LevelHistory from "../models/LevelHistory";

// Import Libraries
import { getNeed } from "../lib/level";
import { getRandomBoolean } from "../lib/random";
import { httpStatusCodes } from "../lib/https-status-codes";

export const getLevel = (req, res) => {
  return res.send("Developing... getLevel");
};

export const getCheckLevel = async (req, res) => {
  // Grab the variable from the params
  const {
    params: { username },
  } = req;

  // Check user exists
  const isExists = await User.exists({ username });
  if (!isExists) return res.sendStatus(httpStatusCodes.NOT_FOUND);

  // If user exists, grab all of the User information from the mongoDB and populate the level history array
  const userInfo = await User.findById(isExists["_id"]).populate({
    path: "history",
    populate: {
      path: "level",
    },
  });

  // Return json
  // Ref) https://github.com/dcs-holdum/.github/blob/master/docs/API_EXAMPLE/LEVEL/CHECK.json
  return res.json({
    now: userInfo.level,
    history: userInfo.history.level.reverse(),
  });
};

export const patchLevelUp = async (req, res) => {
  // Grab the variable from the params
  const {
    params: { username },
  } = req;

  // Check user exists
  const isExists = await User.exists({ username });
  if (!isExists) return res.sendStatus(httpStatusCodes.NOT_FOUND);

  // If user exists, grab all of the User information from the mongoDB
  const userInfo = await User.findById(isExists["_id"]);

  try {
    // Get need percentage and money
    const need = getNeed(userInfo.level);

    // Calulate if user can upgrade the level of the user or not
    const isPossible = getRandomBoolean(need.percentage);

    // If user can, calulate if user can spend the money and if not, return status code to kill this function, if user can spend the money, modify the money and level
    if (isPossible) {
      const currentMoney = userInfo.money;

      if (currentMoney < need.money) {
        return res.sendStatus(httpStatusCodes.FORBIDDEN);
      } else {
        await userInfo.update({
          $inc: {
            money: need.money * -1,
            level: 1,
          },
        });
      }
    }

    // Create level histroy
    const createdLevelHistory = await LevelHistory.create({
      spend: need.money,
      from: userInfo.level,
      to: userInfo.level + (isPossible ? 1 : 0),
      success: isPossible,
      user: isExists["_id"],
    });

    // Push to history
    await History.findByIdAndUpdate(userInfo.history["_id"], {
      $push: {
        level: createdLevelHistory["_id"],
      },
    });

    // Return json
    // Ref) https://github.com/dcs-holdum/.github/blob/master/docs/API_EXAMPLE/LEVEL/UP.json
    return res.status(httpStatusCodes.CREATED).json({
      time: new Date().now,
      level: userInfo.level + isPossible ? 1 : 0,
      success: isPossible,
      percentage: need.percentage,
      spend: need.money,
      from: createdLevelHistory.from,
      to: createdLevelHistory.to,
    });
  } catch (error) {
    console.log(`SERVER_ERROR : ${error}`);
    return res.sendStatus(httpStatusCodes.BAD_GATEWAY);
  }
};
