import User from "../models/User";
import History from "../models/History";
import AttendanceHistory from "../models/AttendanceHistory";
import { getLastElementOfArray } from "../lib/list";
import { httpStatusCodes } from "../lib/https-status-codes";

export const getAttendance = (req, res) => {
  return res.send("Developing... getAttendance");
};

export const getCheckAttendance = async (req, res) => {
  const {
    params: { username },
  } = req;

  const isExists = await User.exists({ username });

  if (!isExists) return res.sendStatus(httpStatusCodes.NOT_FOUND);

  const userInfo = await User.findById(isExists["_id"]).populate({
    path: "history",
    populate: {
      path: "attendance",
    },
  });

  const currentDate = new Date();
  const currentDay = currentDate.getDay();

  const lastHistoryDate = getLastElementOfArray(userInfo.history.attendance);
  const lastHistoryDay = lastHistoryDate?.time?.getDay() || -1;

  let today = false;

  if (!lastHistoryDate || currentDay !== lastHistoryDay) {
    today = true;
  }

  return res.json({
    today,
    history: userInfo.history.attendance.reverse(),
  });
};

export const postStampAttendance = async (req, res) => {
  const {
    params: { username },
  } = req;

  const isExists = await User.exists({ username });

  if (!isExists) return res.sendStatus(httpStatusCodes.NOT_FOUND);

  const userInfo = await User.findById(isExists["_id"]).populate({
    path: "history",
    populate: {
      path: "attendance",
    },
  });

  const currentDate = new Date();
  const currentDay = currentDate.getDay();

  const lastHistoryDate = getLastElementOfArray(userInfo.history.attendance);
  const lastHistoryDay = lastHistoryDate?.time?.getDay() || -1;

  if (!lastHistoryDate || currentDay !== lastHistoryDay) {
    try {
      const createdStamp = await AttendanceHistory.create({
        user: isExists["_id"],
      });

      await History.findByIdAndUpdate(userInfo.history["_id"], {
        $push: {
          attendance: createdStamp["_id"],
        },
      });

      return res.sendStatus(httpStatusCodes.CREATED);
    } catch (error) {
      console.log(`SERVER_ERROR : ${error}`);
      return res.sendStatus(httpStatusCodes.BAD_GATEWAY);
    }
  } else {
    return res.sendStatus(httpStatusCodes.CONFLICT);
  }
};
