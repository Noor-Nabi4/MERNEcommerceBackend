const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { Order } = require("../models/Order");

exports.fetchOrdersByUser = catchAsyncErrors(async (req, res, next) => {
  const {id} = req.user;
  const order = await Order.find({ user: id })
    .populate("user")
  res.json(order);
});
exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await new Order(req.body).save();
  const result = await order.populate("user");
  res.json(result);
});
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
  const result = await order.populate("product");
  res.json(result);
});
