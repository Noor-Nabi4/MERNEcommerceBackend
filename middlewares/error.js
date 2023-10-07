const ErrorHanler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    const message = `Resouce Not Found. Invalid: ${err.path}`;
    err = new ErrorHanler(message, 400);
  }
  //mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHanler(message, 400);
  }

  //Wrong JWT Token error
  if (err.name === "JSONWebTokenError") {
    const message = `Json Web Token is Invalid, Try again`;
    err = new ErrorHanler(message, 400);
  }

  // JWT Expire error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again`;
    err = new ErrorHanler(message, 400);
  }
  res.status(err.statusCode).json({ success: false, message: err.message });
};
