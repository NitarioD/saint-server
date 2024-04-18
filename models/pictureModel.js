const { model, Schema } = require("mongoose");

const PictureSchema = new Schema(
  {
    photo: {
      data: Buffer,
      contentType: String,
    },
    category: { type: [String], enum: ["profile", "product"], required: true },
  },
  { timestamps: true }
);

module.exports = model("Image", PictureSchema);
