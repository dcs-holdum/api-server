import User from "../models/User";
import { httpStatusCodes } from "../lib/https-status-codes";

export const getMoney = (req, res) => {
  return res.send("Developing... getMoney");
};

export const getCheckMoney = async (req, res) => {
  const {
    params: { username }
  } = req;

  const isExists = await User.exists({ username });

  if (!isExists) return res.sendStatus(httpStatusCodes.NOT_FOUND);

  try {
    const userInfo = await User.findById(isExists["_id"], { money: true });

    return res.json({
      money: userInfo.money,
    })
  } catch (error) {
    console.log(`SERVER_ERROR : ${error}`);
    return res.sendStatus(httpStatusCodes.BAD_GATEWAY);
  }
};

export const patchEarnMoney = async (req, res) => {
  const {
    params: { username },
    body: { money },
  } = req;

  const isExists = await User.exists({ username });

  if (!isExists) return res.sendStatus(httpStatusCodes.NOT_FOUND);

  try {
    const updatedUser = await User.findByIdAndUpdate(isExists["_id"], {
      $inc: {
        money,
      }
    });

    console.log(updatedUser);
    return res.json({
      past: updatedUser.money - money,
      now: updatedUser.money,
      request: money,
    });
  } catch (error) {
    console.log(`SERVER_ERROR : ${error}`);
    return res.sendStatus(httpStatusCodes.BAD_GATEWAY);
  }
};

export const patchLoseMoney = async (req, res) => {
  const {
    params: { username },
    body: { money },
  } = req;

  const isExists = await User.exists({ username });

  if (!isExists) return res.sendStatus(httpStatusCodes.NOT_FOUND);

  try {
    const updatedUser = await User.findByIdAndUpdate(isExists["_id"], {
      $inc: {
        money: -money,
      }
    });

    console.log(updatedUser);
    return res.json({
      past: updatedUser.money - money,
      now: updatedUser.money,
      request: money,
    });
  } catch (error) {
    console.log(`SERVER_ERROR : ${error}`);
    return res.sendStatus(httpStatusCodes.BAD_GATEWAY);
  }
};
