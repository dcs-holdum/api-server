import User from "../models/User";

export const getMoney = (req, res) => {
  return res.send("Developing... getMoney");
};

export const getCheckMoney = async (req, res) => {
  const {
    params: { username }
  } = req;

  const isExists = await User.exists({ username });

  if (!isExists) return res.sendStatus(404);

  const userInfo = await User.findById(isExists["_id"], { money: true });

  return res.json({
    money: userInfo.money,
  });
};

export const patchEarnMoney = async (req, res) => {
  const {
    params: { username },
    body: { money },
  } = req;

  const isExists = await User.exists({ username });

  if (!isExists) return res.sendStatus(404);

  try {
    const updatedUser = await User.findByIdAndUpdate(isExists["_id"], {
      $inc: {
        money,
      }
    });

    return res.json({
      past: updatedUser.money - money,
      now: updatedUser.money,
      request: money,
    });
  } catch (error) {
    console.log(`SERVER_ERROR : ${error}`);
    return res.sendStatus(400);
  }
};

export const patchLoseMoney = async (req, res) => {
  const {
    params: { username },
    body: { money },
  } = req;

  const isExists = await User.exists({ username });

  if (!isExists) return res.sendStatus(404);

  try {
    const updatedUser = await User.findByIdAndUpdate(isExists["_id"], {
      $inc: {
        money: -money,
      }
    });

    return res.json({
      past: updatedUser.money - money,
      now: updatedUser.money,
      request: money,
    });
  } catch (error) {
    console.log(`SERVER_ERROR : ${error}`);
    return res.sendStatus(400);
  }
};
