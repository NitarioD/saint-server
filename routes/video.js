const express = require("express");
const router = express.Router();

const {
  requireSignin,
  isAuthorizedToRead,
  isAdmin,
} = require("../controllers/auth");
const {
  addVideo,
  getVideos,
  addTag,
  getTags,
  updateTag,
  deleteTag,
  updateVideo,
  deleteVideo,
  getRecentVideo,
} = require("../controllers/video");

router.post("/video/new_tag", requireSignin, isAdmin, addTag);
router.get("/video/tags", requireSignin, isAdmin, getTags);
router.put("/video/tag/:id", requireSignin, isAdmin, updateTag);
router.delete("/video/tag/:id", requireSignin, isAdmin, deleteTag);

router.post("/video", requireSignin, isAdmin, addVideo);
router.get("/videos", getVideos);
router.put("/videos", requireSignin, isAdmin, updateVideo);
router.delete("/video/:id", requireSignin, isAdmin, deleteVideo);

//get recent video
router.get("/video/recent", getRecentVideo);

module.exports = router;
