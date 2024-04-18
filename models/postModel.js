const { model, Schema } = require("mongoose");

const PostSchema = new Schema(
  {
    title: { type: String, trim: true, required: true, lowercase: true },
    content: { type: String },
    category: {
      type: String,
      required: true,
      enum: ["teaching", "evangelism", "publication"],
    },
  },
  { timestamps: true }
);

module.exports = model("Post", PostSchema);
