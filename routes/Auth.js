const express = require("express");
const {
  createUser,
  login,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/Auth");
const router = express.Router();
router
  .post("/signup", createUser)
  .post("/login", login)
  .delete("/logout", logout)
  .post("/password/forgot", forgotPassword)
  .put("/password/reset/:token", resetPassword);

module.exports = router;
