const express = require("express");
const router = express.Router();

const {
  requireSignin,
  isAuthorizedToRead,
  isAdmin,
} = require("../controllers/auth");
const {
  handlePageEdit,
  handleGetHomePage,
  handleGetPointManPage,
  handleGetAboutSGFPage,
  handleGetFooterInfo,
} = require("../controllers/base_pages");

router.post("/base_page/:page_type", requireSignin, isAdmin, handlePageEdit);
router.put("/base_page/:page_type", requireSignin, isAdmin, handlePageEdit);
router.get("/base_page/footer_info", handleGetFooterInfo);
router.get("/base_page/home", handleGetHomePage);
router.get("/base_page/point_man", handleGetPointManPage);
router.get("/base_page/about_sgf", handleGetAboutSGFPage);

module.exports = router;
