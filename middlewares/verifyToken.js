const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const { ERROR } = require("../utils/httpStatus");
const { ADMIN } = require("../utils/userRoles");

module.exports = (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];

  if (!authHeader) {
    const error = appError.create("Token is required", 401, ERROR);
    return next(error);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;

    if (decoded.role !== ADMIN) {
      const error = appError.create("Forbidden", 403, ERROR);
      return next(error);
    }

    return next();
  } catch (err) {
    const error = appError.create("Invalid token", 401, ERROR);
    return next(error);
  }
};
