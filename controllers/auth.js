const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");

exports.signup = async (req, res) => {
  if (!req.body.password) {
    res.json({ error: "password cannot be empty" });
    return;
  }
  if (req.body.password.length <= 6) {
    res.json({ error: "password must be longer than 6 characters" });
    return;
  }
  try {
    const exist = await User.findOne({ email: req.body.email });
    if (exist) {
      return res.json({
        error: "user with this email already exists, login instead",
      });
    }
    const user = new User(req.body);
    const userDetails = await user.save();
    userDetails.hashed_password = undefined;
    res.json(userDetails);
  } catch (err) {
    console.log(err);
  }
};
exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ ok: true });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.json({
      error: "User with this email does not exist, please signup!",
    });
  const isUser = await user.authenticate(password, user.hashed_password);
  if (!isUser) return res.json({ error: "password is incorrect" });

  //generate a signed token using the user id and secret
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  //persist the token as t in cookie with expiry
  res.cookie("t", token, { expire: new Date() + 999 });
  //return user details and token to client
  const { _id, username, role } = user;
  res.json({ token, user: { _id, email, username, role } });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ ok: true });
};

exports.requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

exports.isAuthorizedToRead = async (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;

  // admin should be authorized to view some routes but not update
  if (req.method == "GET") {
    //check if the user is admin
    const { role } = await User.findOne({ _id: req.auth._id }).select("role");

    //if the user is admin authorize
    if (role == "admin") {
      next();
      return;
    }
  }
  if (!authorized) {
    res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

exports.isAdmin = async (req, res, next) => {
  const id = req.auth?._id;
  const user = await User.findById(id);
  if (user.role == "admin") {
    return next();
  } else {
    //if user is not admin
    return res.status(401).send("Unauthorized");
  }
};

// exports.verifyMail = async (req, res) => {
//   const email = req.params.email;
//   const emailInfo = await User.findOne({ email });
//   if (emailInfo) {
//     try {
//       const reset_password = "sgf_" + uuidv4();
//       //store resetcode in database
//       await User.findOneAndUpdate({ email }, { reset_password });
//       //send the reset code to the email
//       return res.json({ ok: true });
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   return res.json({ error: "User with this email does not exist" });
// };

// exports.resetPassword = async (req, res) => {
//   //
// };
