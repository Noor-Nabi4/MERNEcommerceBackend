const express = require("express");
const router = express.Router();
// const { isAuthenticatedUser, authorizeRole } = require("../middlewares/auth");
const { getAllBrands } = require("../controllers/Brand");

router.route("/").get(getAllBrands);

module.exports = router;
