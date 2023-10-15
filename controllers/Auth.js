const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { User } = require("../models/User");
const ErrorHanler = require("../utils/errorHandler");
exports.createUser = catchAsyncErrors(async (req, res, next) => {
  let user = await new User(req.body);
  user = await user.save();
  res.json({
    user,
  });
});
exports.login = catchAsyncErrors(async (req, res, next) => {
  const { password, email } = req.body;
  let user = await User.findOne({ email: email });
  if (!user) {
    return next(new ErrorHanler("Invalid Credientials"));
  }
  if (user.password !== password) {
    return next(new ErrorHanler("Invalid Credientials"));
  }
  res.json({
        name: user.name,
        id: user.id,
        email: user.email,
        addresses: user.addresses,
        role: user.role
  });
});
