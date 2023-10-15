const express = require("express");
const {
  fetchOrdersByUser,
  createOrder,
  updateOrder,
} = require("../controllers/Order");
const router = express.Router();
// const { isAuthenticatedUser, authorizeRole } = require("../middlewares/auth");

router.route("/").post( createOrder);
router.route("/:id").get( fetchOrdersByUser).patch(updateOrder);

module.exports = router;
