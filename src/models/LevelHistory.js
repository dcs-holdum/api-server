import mongoose from "mongoose";

const levelHistorySchema = new mongoose.Schema({
  time: {
    type: Date,
    required: true,
    default: Date.now,
  },
  spend: {
    type: Number,
    required: true,
    min: 5000,
    max: 5000 * 2 * 2 * 2 * 2 * 2 * 2 * 2 * 2 * 2,
  },
  from: {
    type: Number,
    required: true,
    min: 0,
    max: 9,
  },
  to: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
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

const LevelHistory = mongoose.model("LevelHistory", levelHistorySchema);
export default LevelHistory;
