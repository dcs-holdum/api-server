import User from "../models/User";
import History from "../models/History";
import LevelHistory from "../models/LevelHistory";
import { getNeed } from "../lib/level";
import { getRandomBoolean } from "../lib/random";

export const getLevel = (req, res) => {
  return res.send("Developing... getLevel");
};

export const getCheckLevel = async (req, res) => {
  const {
    params: { username }
  } = req;

  const isExists = await User.exists({ username });

  if (!isExists) return res.sendStatus(404);

  const userInfo = await User.findById(isExists["_id"]).populate({
    path: "history",
    populate: {
      path: "level",
    }
  });

  return res.json({
    now: userInfo.level,
    history: userInfo.history.level.reverse(),
  });
};

export const patchLevelUp = async (req, res) => {
  const {
    params: { username }
  } = req;

  const isExist = await User.exists({ username });

  if (!isExist) return res.sendStatus(404);

  const userInfo = await User.findById(isExist["_id"]);

  try {
    const need = getNeed(userInfo.level);
    const isPossible = getRandomBoolean(need.percentage);

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

    const createdLevelHistory = await LevelHistory.create({
      spend: need.money,
      from: userInfo.level,
      to: userInfo.level + (isPossible ? 1 : 0),
      success: isPossible,
      user: isExist["_id"],
    });

    await History.findByIdAndUpdate(userInfo.history["_id"], {
      $push: {
        level: createdLevelHistory["_id"],
      },
    });

    return res.json({
      time: new Date().now,
      level: userInfo.level + isPossible ? 1 : 0,
      success: isPossible,
      percentage: need.percentage,
      money: need.money,
      from: createdLevelHistory.from,
      to: createdLevelHistory.to,
    });
  } catch (error) {
    console.log(`SERVER_ERROR : ${error}`);
    return res.sendStatus(400);
  }
};
