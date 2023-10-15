const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { User } = require("../models/User");
exports.fetchUserById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user);
});

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.json(user);
});
/* exports.getAllBrands = catchAsyncErrors(async (req, res, next) => {
  const user = await User.find();
  res.json({
    doc,
  });
}); */
