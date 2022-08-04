import mongoose from "mongoose";

const attendanceHistorySchema = new mongoose.Schema({
  time: {
    type: Date,
    required: true,
    default: Date.now,
  },
  streak: {
    type: Number,
    reuqired: true,
    min: 1,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const AttendanceHistory = mongoose.model("AttendanceHistory", attendanceHistorySchema);
export default AttendanceHistory;
