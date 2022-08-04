import express from "express";

// Import Controllers and Middlewares
import { getAttendance, getCheckAttendance, postStampAttendance } from "../controllers/attendanceControllers";

const attendanceRouter = express.Router();

// Routeing
attendanceRouter.route("/").get(getAttendance);
attendanceRouter.route("/check/:username").get(getCheckAttendance);
attendanceRouter.route("/stamp/:username").post(postStampAttendance);

export default attendanceRouter;
