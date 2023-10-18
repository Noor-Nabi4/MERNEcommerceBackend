const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { Cart } = require("../models/Cart");

exports.fetchCartByUser = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  console.log(user);
  const cartItems = await Cart.find({ user: user })
    .populate("user")
    .populate("product");
  res.json(cartItems);
});
exports.addToCart = catchAsyncErrors(async (req, res, next) => {
  const cart = await new Cart(req.body).save();
  const result = await cart.populate("product");
  res.json(result);
});
exports.deleteFromCart = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const cart = await Cart.findByIdAndDelete(id);

  res.json(cart);
});
exports.updateCart = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const cart = await Cart.findByIdAndUpdate(id, req.body, { new: true });
  const result = await cart.populate("product");
  console.log(result);
  res.json(result);
});
