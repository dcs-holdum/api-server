// Import Models
import User from "../models/User";
import History from "../models/History";
import LevelHistory from "../models/LevelHistory";

// Import Libraries
import { getNeed } from "../lib/level";
import { getRandomBoolean } from "../lib/random";

export const getLevel = (req, res) => {
  return res.send("Developing... getLevel");
};

export const getCheckLevel = async (req, res) => {
  // Grab the variable from the params
  const {
    params: { username }
  } = req;

  // Check user exists
  const isExists = await User.exists({ username });
  if (!isExists) return res.sendStatus(404);

  // If user exists, grab all of the User information from the mongoDB and populate the level history array
  const userInfo = await User.findById(isExists["_id"]).populate({
    path: "history",
    populate: {
      path: "level",
    }
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
    params: { username }
  } = req;

  // Check user exists
  const isExist = await User.exists({ username });
  if (!isExist) return res.sendStatus(404);

  // If user exists, grab all of the User information from the mongoDB
  const userInfo = await User.findById(isExist["_id"]);

  try {
    // Get need percentage and money
    const need = getNeed(userInfo.level);

    // Calulate if user can upgrade the level of the user or not
    const isPossible = getRandomBoolean(need.percentage);

    // If user can, calulate if user can spend the money and if not, return status code to kill this function, if user can spend the money, modify the money and level
    if (isPossible) {
      const currentMoney = userInfo.money;

      if (currentMoney < need.money) {
        return res.sendStatus(403);
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
      user: isExist["_id"],
    });

    // Push to history
    await History.findByIdAndUpdate(userInfo.history["_id"], {
      $push: {
        level: createdLevelHistory["_id"],
      },
    });

    // Return json
    // Ref) https://github.com/dcs-holdum/.github/blob/master/docs/API_EXAMPLE/LEVEL/UP.json
    return res.json({
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
    return res.sendStatus(400);
  }
};
