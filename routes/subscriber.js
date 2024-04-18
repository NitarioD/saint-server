const express = require("express");
const router = express.Router();
const {
  requireSignin,
  isAuthorizedToRead,
  isAdmin,
} = require("../controllers/auth");

const {
  subcriberById,
  subscribers,
  read,
  mail,
  mailAll,
  subscribe,
  unsubscribe,
  getCode,
} = require("../controllers/subscriber");

router.post("/subscriber", subscribe);
//mail subscriber
router.post("/subscriber/mail/:email_addr", requireSignin, isAdmin, mail);
//mail all subscribbers
router.post("/subscribers/mail", requireSignin, isAdmin, mailAll);

router.param("subscriberId", subcriberById);
router.get(
  "/subscribers/:subscriberId",
  requireSignin,
  isAuthorizedToRead,
  read
);

router.get("/subscribers", requireSignin, isAdmin, subscribers);
//handle request for unsubscribe code
router.get("/subscriber/:email_addr", getCode);
//handle unsubscribe
router.post("/unsubscribe/:email_addr", unsubscribe);

module.exports = router;
