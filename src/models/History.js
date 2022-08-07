import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  attendance: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "AttendanceHistory",
    },
  ],
  level: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "LevelHistory",
    },
  ],
  gambling: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "GamblingHistory",
    },
  ],
});

const History = mongoose.model("History", historySchema);
export default History;
