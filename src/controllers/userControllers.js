import User from "../models/User";
import History from "../models/History";
import { httpStatusCodes } from "../lib/https-status-codes";

export const getUser = async (req, res) => {
  const {
    params: { username }
  } = req;

  const isExsits = await User.exists({ username });

  if (!isExsits) return res.sendStatus(httpStatusCodes.NOT_FOUND);

  const foundedUser = await User.findById(isExsits["_id"]).populate("history");

  return res.json({
    user: foundedUser
  });
}

export const postCreateUser = async (req, res) => {
  const {
    params: { username }
  } = req;

  const isExsits = await User.exists({ username });

  if (isExsits) return res.sendStatus(httpStatusCodes.CONFLICT);

  try {
    const createdUser = await User.create({ username });

    const userHistory = await History.create({ user: createdUser["_id"] });

    await createdUser.update({ history: userHistory["_id"] });

    return res.sendStatus(httpStatusCodes.CREATED);
  } catch (error) {
    console.log(`SERVER_ERROR : ${error}`);
    return res.sendStatus(httpStatusCodes.BAD_GATEWAY);
  }
};

export const deleteUser = async (req, res) => {
  const {
    params: { username }
  } = req;

  const isExsits = await User.exists({ username });

  if (!isExsits) return res.sendStatus(httpStatusCodes.NOT_FOUND);

  try {
    await User.findByIdAndDelete(isExsits["_id"]);
    return res.sendStatus(httpStatusCodes.DELETED);
  } catch (error) {
    console.log(`SERVER_ERROR : ${error}`);
    return res.sendStatus(httpStatusCodes.BAD_GATEWAY);
  }
}
