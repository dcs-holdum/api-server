import mongoose from "mongoose";

const attendanceHistorySchema = new mongoose.Schema({
  time: {
    type: Date,
    required: true,
    unique: true,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const AttendanceHistory = mongoose.model(
  "AttendanceHistory",
  attendanceHistorySchema
);
export default AttendanceHistory;
