// Import dotenv for grab the variables from the development environment file and regenerator runtime to use `async-await` and db to connect to database and app to run the server
import dotenv from "dotenv/config";
import "regenerator-runtime";
import "./db";
import app from "./server";

// Import All Models
import "./models/User";
import "./models/History";
import "./models/AttendanceHistory";
import "./models/LevelHistory";
import "./models/GablingHistory";

// Define the port
const PORT = process.env.PORT || 4000;

const handleListening = () => {
  console.log(`✅ Server is listening on port ${PORT}`);
};

// Run server
app.listen(PORT, handleListening);
