const { model, Schema } = require("mongoose");

const VideoSchema = new Schema(
  {
    title: { type: "string", trim: true, required: true, lowercase: true },
    link: { type: "string", trim: true, required: true },
    embedlink: { type: "string", trim: true, required: true },
    tag: { type: Schema.Types.ObjectId, ref: "VideoTag", required: true },
    description: { type: "string", trim: true, default: "..." },
  },
  { timestamps: true }
);

module.exports = model("Video", VideoSchema);
