const express = require("express");
const router = express.Router();
// const { isAuthenticatedUser, authorizeRole } = require("../middlewares/auth");
const { getAllProducts, createProduct } = require("../controllers/Product");

router.route("/").get(getAllProducts);
router
  .route("/create")
  .post(/* isAuthenticatedUser, authorizeRole("admin"), */ createProduct);

module.exports = router;
