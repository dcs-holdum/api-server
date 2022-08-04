export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "DCS Holdum";
  next();
}
