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
    default: 1,
    min: 1,
    max: 10,
  },
  history: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "History",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
