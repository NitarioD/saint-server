const express = require("express");
const router = express.Router();

const {
  requireSignin,
  isAuthorizedToRead,
  isAdmin,
} = require("../controllers/auth");
const { userById, read, users } = require("../controllers/user");

router.param("userId", userById);
router.get("/users/:userId", requireSignin, isAuthorizedToRead, read);
router.get("/users", requireSignin, isAdmin, users);

module.exports = router;
