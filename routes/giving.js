const express = require("express");
const router = express.Router();

const { verify } = require("../controllers/giving");

router.get("/giving/:ref", verify);

module.exports = router;
