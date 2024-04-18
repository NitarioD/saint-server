const User = require("../models/userModel");

exports.userById = async (req, res, next, id) => {
  const user = await User.findById(id);
  if (!user) {
    res.status(400).json({ error: "User not found" });
  }
  user.hashed_password = undefined;
  req.profile = user;
  next();
};

exports.users = async (req, res) => {
  const users = await User.find({}).select("-hashed_password");
  res.json({ users });
};

exports.read = (req, res) => {
  return res.json(req.profile);
};
