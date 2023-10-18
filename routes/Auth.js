const express = require("express");
const {
  createUser,
  login,
  logout,
  forgotPassword,
  resetPassword,
  CheckAuth,
} = require("../controllers/Auth");
const { isAuthenticatedUser, authorizeRole } = require("../middlewares/auth");
const router = express.Router();
router
  .post("/signup", createUser)
  .get("/check", isAuthenticatedUser, CheckAuth)
  .post("/login", login)
  .delete("/logout", logout)
  .post("/password/forgot", forgotPassword)
  .put("/password/reset/:token", resetPassword);

module.exports = router;
