const { model, Schema } = require("mongoose");

const VideoTagSchema = new Schema(
  {
    tag: {
      type: "string",
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = model("VideoTag", VideoTagSchema);
