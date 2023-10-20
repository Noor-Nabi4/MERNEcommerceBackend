const express = require("express");
const { fetchUserById, updateUser } = require("../controllers/User");
const { isAuthenticatedUser, authorizeRole } = require("../middlewares/auth");
const router = express.Router();
router.route("/").get(fetchUserById).put(isAuthenticatedUser, updateUser);

module.exports = router;
