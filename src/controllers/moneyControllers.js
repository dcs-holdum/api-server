// Import Models
import User from "../models/User";
import { httpStatusCodes } from "../lib/https-status-codes";

export const getMoney = (req, res) => {
  return res.send("Developing... getMoney");
};

export const getCheckMoney = async (req, res) => {
  // Grab the variable from the params
  const {
    params: { username },
  } = req;

  // Check user exists
  const isExists = await User.exists({ username });
  if (!isExists) return res.sendStatus(httpStatusCodes.NOT_FOUND);

  // If user exists, grab all of the User information from the mongoDb only the money
  const userInfo = await User.findById(isExists["_id"], { money: true });

  // Return json
  // Ref) https://github.com/dcs-holdum/.github/blob/master/docs/API_EXAMPLE/MONEY/CHECK.json
  return res.json({
    money: userInfo.money,
  });
};

export const patchEarnMoney = async (req, res) => {
  // Grab the variables from the params and body
  const {
    params: { username },
    body: { money },
  } = req;

  // Check user exists
  const isExists = await User.exists({ username });
  if (!isExists) return res.sendStatus(httpStatusCodes.NOT_FOUND);

  try {
    // If user exists, increase the value of the user money
    const updatedUser = await User.findByIdAndUpdate(isExists["_id"], {
      $inc: {
        money,
      },
    });

    // Return json
    // Ref) https://github.com/dcs-holdum/.github/blob/master/docs/API_EXAMPLE/MONEY/EARN.json
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
  // Grab the variables from the params and body
  const {
    params: { username },
    body: { money },
  } = req;

  // Check user exists
  const isExists = await User.exists({ username });
  if (!isExists) return res.sendStatus(httpStatusCodes.NOT_FOUND);

  try {
    // If user exists, decrease the value of the user money
    const updatedUser = await User.findByIdAndUpdate(isExists["_id"], {
      $inc: {
        money: -money,
      },
    });

    // Return json
    // Ref) https://github.com/dcs-holdum/.github/blob/master/docs/API_EXAMPLE/MONEY/LOSE.json
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