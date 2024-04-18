const express = require("express");

const router = express.Router();

const {
  signup,
  login,
  signout,
  requireSignin,
  isAdmin,
  // verifyMail,
  // resetPassword,
} = require("../controllers/auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", signout);
// router.get("/reset_password/:email", verifyMail);
// router.post("/reset_password/:email", resetPassword);
router.get("/is_admin", requireSignin, isAdmin, (req, res) =>
  res.json({ ok: true })
);

module.exports = router;
