const { Product } = require("../models/Product");
const ErrorHanler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatues");

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  //   req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.json({
    product,
  });
});
exports.fetchProductById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.json(product);
});
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  /* const apiFeatue = new ApiFeatures(Product.find(), req.query)
    .search()
    .fillter()
    .pagination(8); */
    const products = await Product.find();
  const totalRrecords = products.length
  // const products = await apiFeatue.query;
  // console.log(products);
  res.set("X-Total-Count", totalRrecords);
  res.json(products);
});
