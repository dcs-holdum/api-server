import express from "express";

// Import Controllers and Middlewares

const attendanceRouter = express.Router();

// Routeing
attendanceRouter.route("/").get();
attendanceRouter.route("/check/:userId").get();
attendanceRouter.route("/stamp/:userId").post();

export default attendanceRouter;
