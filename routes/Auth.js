const express = require("express");
const { createUser, login } = require("../controllers/Auth");
const router = express.Router();
router.post("/signup", createUser).post("/login", login);

module.exports = router;
