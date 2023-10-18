const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { User } = require("../models/User");
const ErrorHanler = require("../utils/errorHandler");
const sendToken = require("../utils/jWTToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

exports.CheckAuth = catchAsyncErrors(async (req, res, next) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
});
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

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHanler("user not found", 404));
  }
  const resetToken = user.setResetPasswordToken();
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/auth/password/reset/${resetToken}`;
  await user.save({ validateBeforeSave: false });
  try {
    await sendEmail({
      email: user.email,
      subject: "ecommerce",
      message: resetPasswordUrl,
    });
    res.json({
      success: true,
      message: "send",
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHanler(error.message, 500));
  }
});
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHanler(
        "reset password  token is invalid or has been expired",
        400
      )
    );
  }
  if (password !== confirmPassword) {
    new ErrorHanler("password does not match with confirm password", 400);
  }
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});
