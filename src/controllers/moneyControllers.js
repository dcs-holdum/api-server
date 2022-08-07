// Import Models
import User from "../models/User";

export const getMoney = (req, res) => {
  return res.send("Developing... getMoney");
};

export const getCheckMoney = async (req, res) => {
  // Grab the variable from the params
  const {
    params: { username }
  } = req;

  // Check user exists
  const isExists = await User.exists({ username });
  if (!isExists) return res.sendStatus(404);

  try {
    // If user exists, grab all of the User information from the mongoDb only the money
    const userInfo = await User.findById(isExists["_id"], { money: true });

    // Return json
    // Ref) https://github.com/dcs-holdum/.github/blob/master/docs/API_EXAMPLE/MONEY/CHECK.json
    return res.json({
      money: userInfo.money,
    })
  } catch (error) {
    console.log(`SERVER_ERROR : ${error}`);
    return res.sendStatus(400);
  }
};

export const patchEarnMoney = async (req, res) => {
  // Grab the variables from the params and body
  const {
    params: { username },
    body: { money },
  } = req;

  // Check user exists
  const isExists = await User.exists({ username });
  if (!isExists) return res.sendStatus(404);

  try {
    // If user exists, increase the value of the user money
    const updatedUser = await User.findByIdAndUpdate(isExists["_id"], {
      $inc: {
        money,
      }
    });

    // Return json
    // Ref) https://github.com/dcs-holdum/.github/blob/master/docs/API_EXAMPLE/MONEY/EARN.json
    return res.sendStatus(200);
  } catch (error) {
    console.log(`SERVER_ERROR : ${error}`);
    return res.sendStatus(400);
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
  if (!isExists) return res.sendStatus(404);

  try {
    // If user exists, decrease the value of the user money
    const updatedUser = await User.findByIdAndUpdate(isExists["_id"], {
      $inc: {
        money: -money,
      }
    });

    // Return json
    // Ref) https://github.com/dcs-holdum/.github/blob/master/docs/API_EXAMPLE/MONEY/LOSE.json
    return res.sendStatus(200);
  } catch (error) {
    console.log(`SERVER_ERROR : ${error}`);
    return res.sendStatus(400);
  }
};
