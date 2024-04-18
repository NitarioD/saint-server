const express = require("express");
const router = express.Router();

const {
  requireSignin,
  isAuthorizedToRead,
  isAdmin,
} = require("../controllers/auth");
const {
  addPost,
  getPosts,
  getPostTeaching,
  getPostAdmin,
  updatePost,
  deletePost,
  getPostEvangelism,
  getPostPublication,
  getRecentPost,
} = require("../controllers/post");

router.post("/post", requireSignin, isAdmin, addPost);
router.get("/posts", getPosts);
//get recent post
router.get("/post/recent", getRecentPost);

router.get("/posts/teaching", getPostTeaching);
router.get("/posts/publication", getPostPublication);
router.get("/posts/evangelism", getPostEvangelism);
router.get("/post/:id", requireSignin, isAdmin, getPostAdmin);
router.put("/post/:id", requireSignin, isAdmin, updatePost);
router.delete("/post/:id", requireSignin, isAdmin, deletePost);

module.exports = router;
