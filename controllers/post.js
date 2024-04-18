const Post = require("../models/postModel");

exports.addPost = async (req, res) => {
  const title = req.body.content.filter(
    (block) =>
      block.type == "heading" && block.attrs.level == 1 && block.content
  );
  if (title.length == 0) {
    return res.json({ error: "Use the h1 tag to enter a title" });
  } else if (title.length > 1) {
    return res.json({
      error:
        "There should be only one title. Use only one h1 tag in this post.",
    });
  } else if (!req.body.category) {
    return res.json({ error: "No Post Category Is Selected" });
  } else {
    const exist = await Post.findOne({ title: title[0].content[0].text });
    if (exist) {
      return res.json({
        error: "Post with this title already exists, you can edit it instead",
      });
    } else {
      const post = new Post({
        title: title[0].content[0].text,
        content: req.body.html,
        category: req.body.category,
      });
      post.save();
      return res.json({ ok: true });
    }
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ title: 1 });
    return res.json(posts);
  } catch (err) {
    console.log(err);
  }
};

exports.getPostTeaching = async (req, res) => {
  try {
    const post = await Post.find({ category: "teaching" }).sort({
      createdAt: -1,
    });
    if (post) {
      return res.json(post);
    } else {
      return res.json({ error: "Posts do not exist" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getPostPublication = async (req, res) => {
  try {
    const post = await Post.find({ category: "publication" }).sort({
      createdAt: -1,
    });
    if (post) {
      return res.json(post);
    } else {
      return res.json({ error: "Posts do not exist" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getPostEvangelism = async (req, res) => {
  try {
    const post = await Post.find({ category: "evangelism" }).sort({
      createdAt: -1,
    });
    if (post) {
      return res.json(post);
    } else {
      return res.json({ error: "Posts do not exist" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getRecentPost = async (req, res) => {
  try {
    const post = await Post.find({}, "title content")
      .sort({ createdAt: -1 })
      .limit(1);
    return res.json(post[0]);
  } catch (err) {
    console.log(err);
  }
};

exports.getPostAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    if (post) {
      return res.json({ post });
    } else {
      return res.json({ error: "Post does not exist" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.updatePost = async (req, res) => {
  const title = req.body.content.filter(
    (block) =>
      block.type == "heading" && block.attrs.level == 1 && block.content
  );
  if (title.length == 0) {
    return res.json({ error: "Use the h1 tag to enter a title" });
  } else if (title.length > 1) {
    return res.json({
      error:
        "There should be only one title. Use only one h1 tag in this post.",
    });
  } else if (!req.body.category) {
    return res.json({ error: "No Post Category Is Selected" });
  } else {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      title: title[0].content[0].text,
      content: req.body.html,
      category: req.body.category,
    });
    post.save();
    return res.json({ ok: true });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const deletePost = await Post.findByIdAndDelete(req.params.id);
    if (deletePost) {
      return res.json(deletePost);
    } else {
      return res.json({ error: "Could not delete this post, try again." });
    }
  } catch (err) {
    console.log(err);
  }
};
