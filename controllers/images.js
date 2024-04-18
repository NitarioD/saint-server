const Image = require("../models/pictureModel");
const User = require("../models/userModel");

exports.viewProductsImg = async (req, res) => {
  const images = await Image.find({ category: "product" }).select("_id");
  res.json(images);
};

exports.viewPicture = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.json({ error: "Image not found" });
    res.contentType(image.photo.contentType);
    res.send(image.photo.data);
  } catch (err) {
    console.log(err);
  }
};

exports.uploadPicture = async (req, res) => {
  try {
    const user_id = req.auth._id;
    const user = await User.findById(user_id);
    if (!user) {
      return res.json({
        error: "unauthorized",
      });
    }

    //save image wth the category in photo database

    //find the user's role and determine the category of the image based on that
    let category;
    if (user.role == "admin") {
      category = "product";
    }
    const picture = new Image({ category });
    const imgFile = req.file;

    if (imgFile) {
      //reject files that are not images
      if (imgFile.mimetype.split("/")[0] != "image") {
        return res.json({ error: "Only acccepts images" });
      }
      if (imgFile.size > 1000000) {
        return res.json({ error: "Image should be less than 1mb in size" });
      }
      picture.photo.data = imgFile.buffer;
      picture.photo.contentType = imgFile.mimetype;
    }

    try {
      const pic = await picture.save();
      res.json({ ok: true });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deletePicture = async (req, res) => {
  try {
    const imgId = req.params.id;
    const user = await User.findById(req.auth._id);

    //delete profile or product picture depending on the role of the user making the request
    const img = await Image.findById(imgId);

    if (img.category == "product" && user.role == "admin") {
      await Image.findByIdAndDelete(imgId);
      return res.json({ ok: true });
    } else if (img.category == "profile" && user.role == "user") {
      await Image.findByIdAndDelete(imgId);
      return res.json({ ok: true });
    }
    return res.json({ error: "you are not authorized to delete this image" });
  } catch (err) {
    console.log(err);
  }
};
