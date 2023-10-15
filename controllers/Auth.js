const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { User } = require("../models/User");
const ErrorHanler = require("../utils/errorHandler");
const sendToken = require("../utils/jWTToken");
exports.createUser = catchAsyncErrors(async (req, res, next) => {
  let user = new User(req.body);
  user = await user.save();
  sendToken(user, 200, res);
});
exports.login = catchAsyncErrors(async (req, res, next) => {
  const { password, email } = req.body;
  if (!email || !password) {
    return next(new ErrorHanler("Please enter a email and password", 400));
  }
  let user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    return next(new ErrorHanler("Invalid Credientials", 401));
  }
  const isPasswordMateched = await user.comparePassword(password);
  if (!isPasswordMateched) {
    return next(new ErrorHanler("Invalid Credientials", 401));
  }
  sendToken(user, 200, res);
});
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.json({
    success: true,
    message: "logout successfully",
  });
});
