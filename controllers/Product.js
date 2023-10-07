const { Product } = require("../models/Product");
const ErrorHanler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatues");

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  //   req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.json({
    success: true,
    product,
  });
});
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const apiFeatue = new ApiFeatures(Product.find(), req.query)
    .search()
    .fillter()
    .pagination(8);
  const totalRrecords = await Product.count();
  const products = await apiFeatue.query;
  res.set("X-Total-Count", totalRrecords);
  res.json({
    success: true,
    totalRrecords,
    products,
  });
});
