// Import Models
import User from "../models/User";
import History from "../models/History";

export const getUser = async (req, res) => {
  // Grab the variables from the params
  const {
    params: { username }
  } = req;


  // Check user exists
  const isExsits = await User.exists({ username });
  if (!isExsits) return res.sendStatus(404);

  // If user exists, grab all of the user information from the mongoDB and populate history
  const foundedUser = await User.findById(isExsits["_id"]).populate("history");

  // Return json
  // Ref) https://github.com/dcs-holdum/.github/blob/master/docs/API_EXAMPLE/USER/CHECK.json
  return res.json({
    user: foundedUser
  });
}

export const postCreateUser = async (req, res) => {
  // Grab the variables from the params
  const {
    params: { username }
  } = req;

  // Check user exists
  const isExsits = await User.exists({ username });
  if (isExsits) return res.sendStatus(409);

  try {
    // Create the User
    const createdUser = await User.create({ username });

    // Create the history that will be filled with user activities
    const userHistory = await History.create({ user: createdUser["_id"] });

    // Put id of the history to user
    await createdUser.update({ history: userHistory["_id"] });

    // Return json
    // Ref) https://github.com/dcs-holdum/.github/blob/master/docs/API_EXAMPLE/USER/CREATE.json
    return res.sendStatus(201);
  } catch (error) {
    console.log(`SERVER_ERROR : ${error}`);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (req, res) => {
  // Grab the variables from the params
  const {
    params: { username }
  } = req;

  // Check user exists
  const isExsits = await User.exists({ username });
  if (!isExsits) return res.sendStatus(404);

  try {
    // Delete User
    await User.findByIdAndDelete(isExsits["_id"]);

    // Return json
    // Ref) https://github.com/dcs-holdum/.github/blob/master/docs/API_EXAMPLE/USER/DELETE.json
    return res.sendStatus(204);
  } catch (error) {
    console.log(`SERVER_ERROR : ${error}`);
    return res.sendStatus(400);
  }
}
