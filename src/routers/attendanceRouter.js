import express from "express";

// Import Controllers and Middlewares
import {
  getCheckAttendance,
  postStampAttendance,
} from "../controllers/attendanceControllers";

const attendanceRouter = express.Router();

// Routeing
attendanceRouter.route("/check/:username").get(getCheckAttendance);
attendanceRouter.route("/stamp/:username").post(postStampAttendance);

export default attendanceRouter;
