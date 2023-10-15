
const { User } = require("../models/User");
const ErrorHanler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHanler("please login to access this  resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  const userFound = await User.findById(decodedData.id);
  if (!userFound) {
    return next(new ErrorHanler("please login to access this  resource", 401));
  }
  req.user =  userFound

  next();
});
exports.authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHanler(
          `Role: ${req.user.role} is not allowed to access this resouce`,
          403
        )
      );
    }
    next();
  };
};
