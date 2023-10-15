const express = require("express");
const { createUser, login, logout } = require("../controllers/Auth");
const router = express.Router();
router
  .post("/signup", createUser)
  .post("/login", login)
  .delete("/logout", logout);

module.exports = router;
