import express from "express";

// Import Controllers and Middlewares
import { getAttendance, getCheckAttendance, postStampAttendance } from "../controllers/attendanceControllers";

const attendanceRouter = express.Router();

// Routeing
attendanceRouter.route("/").get(getAttendance);
attendanceRouter.route("/check/:userId").get(getCheckAttendance);
attendanceRouter.route("/stamp/:userId").post(postStampAttendance);

export default attendanceRouter;
