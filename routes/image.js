const multer = require("multer");
const { requireSignin, isAdmin } = require("../controllers/auth");

const {
  viewPicture,
  viewProductsImg,
  uploadPicture,
  deletePicture,
} = require("../controllers/images");

const express = require("express");
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//admin get all images of products
router.get("/images", requireSignin, isAdmin, viewProductsImg);

//get a picture
router.get("/image/:id", viewPicture);

// picture upload
router.post(
  "/image",
  requireSignin,
  isAdmin,
  upload.single("image"),
  uploadPicture
);

//delete product picture
router.delete("/image/:id", requireSignin, deletePicture);

module.exports = router;
