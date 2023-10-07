const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { Category } = require("../models/Category");
exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find();
  res.json({
    success: true,
    categories,
  });
});
