import User from "../models/User";
import History from "../models/History";

export const getUser = async (req, res) => {
  const {
    params: { username }
  } = req;

  const isExsits = await User.exists({ username });

  if (!isExsits) return res.sendStatus(404);

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

  if (isExsits) return res.sendStatus(409);

  try {
    const createdUser = await User.create({ username });

    const userHistory = await History.create({ user: createdUser["_id"] });

    await createdUser.update({ history: userHistory["_id"] });

    return res.json({
      createdUser,
    });
  } catch (error) {
    console.log(`SERVER_ERROR : ${error}`);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (req, res) => {
  const {
    params: { username }
  } = req;

  const isExsits = await User.exists({ username });

  if (!isExsits) return res.sendStatus(404);

  try {
    await User.findByIdAndDelete(isExsits["_id"]);
    return res.json({
      deleteUser,
    });
  } catch (error) {
    console.log(`SERVER_ERROR : ${error}`);
    return res.sendStatus(400);
  }
}
