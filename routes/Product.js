const express = require("express");
const router = express.Router();
 const { isAuthenticatedUser, authorizeRole } = require("../middlewares/auth");
const { getAllProducts, createProduct,fetchProductById } = require("../controllers/Product");

router.route("/").get(isAuthenticatedUser,getAllProducts);
router
  .route("/create")
  .post(/* isAuthenticatedUser, authorizeRole("admin"), */ createProduct);
  router.route("/:id").get(fetchProductById)

module.exports = router;
