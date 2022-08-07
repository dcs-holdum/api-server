import mongoose from "mongoose";

const gamblingHistorySchema = new mongoose.Schema({
  time: {
    type: Date,
    required: true,
    unique: true,
    default: Date.now,
  },
  spend: {
    type: Number,
    required: true,
    min: 0,
  },
  earn: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    reuqired: true,
    min: 0,
    max: 100,
  },
  success: {
    type: Boolean,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const GamblingHistory = mongoose.model("GamblingHistory", gamblingHistorySchema);
export default GamblingHistory;
