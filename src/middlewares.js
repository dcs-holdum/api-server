import { httpStatusCodes } from "./lib/https-status-codes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "DCS Holdum";
  next();
};

export const checkKeyMiddleware = async (req, res, next) => {
  const {
    body: { apiKey },
  } = req;

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.sendStatus(httpStatusCodes.UNAUTHORIZED);
  } else if (apiKey === process.env.API_KEY) {
    next();
  }

  next();
};
