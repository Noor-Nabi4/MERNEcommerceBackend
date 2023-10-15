const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { Brand } = require("../models/Brand");
exports.getAllBrands = catchAsyncErrors(async (req, res, next) => {
  const brands = await Brand.find();
  res.json(
    brands
  );
});
