export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "DCS Holdum";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.user = req.sesion.user || {};
  next();
}
