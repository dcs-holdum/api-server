// Import Models
import User from "../models/User";
import History from "../models/History";
import { httpStatusCodes } from "../lib/https-status-codes";

export const getUser = async (req, res) => {
  // Grab the variables from the params
  const {
    params: { username },
  } = req;

  // Check user exists
  const isExsits = await User.exists({ username });
  if (!isExsits) return res.sendStatus(httpStatusCodes.NOT_FOUND);

  // If user exists, grab all of the user information from the mongoDB and populate history
  const foundedUser = await User.findById(isExsits["_id"]).populate("history");

  // Return json
  // Ref) https://github.com/dcs-holdum/.github/blob/master/docs/API_EXAMPLE/USER/CHECK.json
  return res.json({
    user: foundedUser,
  });
};

export const postCreateUser = async (req, res) => {
  // Grab the variables from the params
  const {
    params: { username },
  } = req;

  // Check user exists
  const isExsits = await User.exists({ username });
  if (isExsits) return res.sendStatus(httpStatusCodes.CONFLICT);

  try {
    // Create the User
    const createdUser = await User.create({ username });

    // Create the history that will be filled with user activities
    const userHistory = await History.create({ user: createdUser["_id"] });

    // Put id of the history to user
    await createdUser.update({ history: userHistory["_id"] });

    // Return json
    // Ref) https://github.com/dcs-holdum/.github/blob/master/docs/API_EXAMPLE/USER/CREATE.json
    return res.status(httpStatusCodes.CREATED).json({
      created: true,
    });
  } catch (error) {
    console.log(`SERVER_ERROR : ${error}`);
    return res.sendStatus(httpStatusCodes.BAD_GATEWAY);
  }
};

export const deleteUser = async (req, res) => {
  // Grab the variables from the params
  const {
    params: { username },
  } = req;

  // Check user exists
  const isExsits = await User.exists({ username });
  if (!isExsits) return res.sendStatus(httpStatusCodes.NOT_FOUND);

  try {
    // Delete User
    await User.findByIdAndDelete(isExsits["_id"]);

    // Return json
    // Ref) https://github.com/dcs-holdum/.github/blob/master/docs/API_EXAMPLE/USER/DELETE.json
    return res.status(httpStatusCodes.DELETED).json({
      deleted: true,
    });
  } catch (error) {
    console.log(`SERVER_ERROR : ${error}`);
    return res.status(httpStatusCodes.BAD_GATEWAY).json({
      deleted: false
    });
  }
};
