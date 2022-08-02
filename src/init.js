import dotenv from "dotenv/config";
import "regenerator-runtime";
import "./db";
import app from "./server";

const PORT = process.env.PORT || 4000;

const handleListening = () => {
  console.log(`✅ Server is listening on port ${PORT}`);
}

app.listen(PORT, handleListening);
