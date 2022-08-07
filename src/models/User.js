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
  },
  level: {
    type: Number,
    default: 0,
    min: 0,
    max: 10,
  },
  history: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "History",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
