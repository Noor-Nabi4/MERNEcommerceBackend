const express = require("express");
const { getAllCategories } = require("../controllers/Category");
const router = express.Router();
// const { isAuthenticatedUser, authorizeRole } = require("../middlewares/auth");

router.route("/").get(getAllCategories);

module.exports = router;
