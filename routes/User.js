const express = require("express");
const { fetchUserById, updateUser } = require("../controllers/User");
const router = express.Router();
router.route("/:id").get(fetchUserById).patch(updateUser);

module.exports = router;
