import dotenv from "dotenv/config";
import "regenerator-runtime";
import "./db";
import app from "./server";

// Import Models
import "./models/User";
import "./models/History";
import "./models/AttendanceHistory";
import "./models/LevelHistory";
import "./models/GablingHistory";

const PORT = process.env.PORT || 4000;

const handleListening = () => {
  console.log(`✅ Server is listening on port ${PORT}`);
}

app.listen(PORT, handleListening);
