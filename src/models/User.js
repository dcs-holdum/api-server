import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  money: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 100000000000,
  },
  level: {
    type: Number,
    min: 1,
    max: 10,
  },
  history: {
    attendance: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "AttendanceHistory",
    }],
    level: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "LevelHistory",
    }],
  }
});

const User = mongoose.model("User", userSchema);
export default User;
