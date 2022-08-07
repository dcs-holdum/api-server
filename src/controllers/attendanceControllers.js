// Import Models
import User from "../models/User";
import History from "../models/History";
import AttendanceHistory from "../models/AttendanceHistory";

// Import Libraries
import { getLastElementOfArray } from "../lib/list";

export const getAttendance = (req, res) => {
  return res.send("Developing... getAttendance");
};

export const getCheckAttendance = async (req, res) => {
  // Grab the variable from the params
  const {
    params: { username }
  } = req;

  // Check user exists
  const isExists = await User.exists({ username });
  if (!isExists) return res.sendStatus(404);

  // If user exists, grab all of the User information from the mongoDB and populate the attendance history array
  const userInfo = await User.findById(isExists["_id"]).populate({
    path: "history",
    populate: {
      path: "attendance",
    }
  });

  // Check Date
  // If the last day of history is today, today will be false, because stamp have to be called once ina day
  const currentDate = new Date();
  const currentDay = currentDate.getDay();

  const lastHistoryDate = getLastElementOfArray(userInfo.history.attendance);
  const lastHistoryDay = lastHistoryDate?.time?.getDay() || -1;

  let today = false;
  if (!lastHistoryDate || currentDay !== lastHistoryDay) {
    today = true;
  }

  // Return json
  // The reason that history is reversed is when create and put the stamp information to attendance array,
  // a server use `push` method in javascript array. `push` is the javascript array method that push the element to an array from the back
  // Then, if the attendance history is read and returned to client, history will be reversed for checking from the recent history
  // Ref) https://github.com/dcs-holdum/.github/blob/master/docs/API_EXAMPLE/ATTENDANCE/CHECK.json
  return res.json({
    today,
    history: userInfo.history.attendance.reverse(),
  })
};

export const postStampAttendance = async (req, res) => {
  // Grab the variable from the params
  const {
    params: { username }
  } = req;

  // Check user exists
  const isExists = await User.exists({ username });
  if (!isExists) return res.sendStatus(404);

  // If user exists, grab all of the User information from the mongoDB and populate the attendance history array
  const userInfo = await User.findById(isExists["_id"]).populate({
    path: "history",
    populate: {
      path: "attendance"
    },
  });

  // Check Date
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const lastHistoryDate = getLastElementOfArray(userInfo.history.attendance);
  const lastHistoryDay = lastHistoryDate?.time?.getDay() || -1;

  // If the last day of history is not a today, create a stamp and push this to attendance history.
  if (!lastHistoryDate || currentDay !== lastHistoryDay) {
    try {
      // Create Stamp
      const createdStamp = await AttendanceHistory.create({ user: isExists["_id"] });

      // Push to history
      await History.findByIdAndUpdate(userInfo.history["_id"], {
        $push: {
          attendance: createdStamp["_id"],
        }
      });

      return res.sendStatus(201);
    } catch (error) {
      console.log(`SERVER_ERROR : ${error}`);
      return res.sendStatus(400);
    }
  } else {
    return res.sendStatus(409);
  }
};
