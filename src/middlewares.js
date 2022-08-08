import { httpStatusCodes } from "./lib/https-status-codes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "DCS Holdum";
  next();
};

export const checkKeyMiddleware = async (req, res, next) => {
  const {
    body: { verifyKey }
  } = req;

  if (!verifyKey || verifyKey !== process.env.VERIFY_KEY) {
    return res.sendStatus(httpStatusCodes.UNAUTHORIZED);
  } else if (verifyKey === process.env.VERIFY_KEY) {
    next();
  }

  next();
};

