import express from "express";
import morgan from "morgan";

// Import Routers
import rootRouter from "./routers/rootRouter";
import attendanceRouter from "./routers/attendanceRouter";
import gamblingRouter from "./routers/gamblingRouter";
import levelRouter from "./routers/levelRouter";
import moneyRouter from "./routers/moneyRouter";

import session from "express-session";
import MongoStore from "connect-mongo";

// Import Middlewares
import { localsMiddleware } from "./middlewares";

// Create Server Application
const app = express();

// Server Config
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session Config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1 * 60 * 60 * 24 * 7,
    },
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    })
  })
)

// Header Config
app.use((_, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
})

// Routing
app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/attendance", attendanceRouter);
app.use("/gambling", gamblingRouter);
app.use("/level", levelRouter);
app.use("/money", moneyRouter);

export default app;
