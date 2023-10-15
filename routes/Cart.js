const express = require("express");
const {
  fetchCartByUser,
  addToCart,
  deleteFromCart,
  updateCart,
} = require("../controllers/Cart");
const router = express.Router();
// const { isAuthenticatedUser, authorizeRole } = require("../middlewares/auth");

router.get("/", fetchCartByUser).post("/", addToCart);
router.route("/:id").delete(deleteFromCart).patch(updateCart);

module.exports = router;
