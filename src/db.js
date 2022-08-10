import mongoose from "mongoose";

// Connect to mongoDB using DB URL
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the connection between server and mongoDB
const db = mongoose.connection;

const handleOpen = () => {
  console.log("✅ Connected to DB");
};

const handleError = err => {
  console.log("❌ DB Error : ", err);
};

// Listen and run function when mongoDB opens or throws out the error
db.on("error", handleError);
db.once("open", handleOpen);
