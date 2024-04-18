const { model, Schema } = require("mongoose");

const BasePagesSchema = new Schema(
  {
    home: {
      banner_img: { type: String, required: true },
      header: {
        h1: { type: String, required: true },
        p: { type: String },
      },
      welcome: {
        h2: { type: String, required: true },
        p: { type: String },
      },
      cards: [
        {
          h3: { type: String, required: true },
          p: { type: String },
          button: { type: String },
          category: {
            type: String,
            enum: ["the point man", "our publications", "our membership"],
            unique: true,
            lowercase: true,
            required: true,
          },
        },
      ],
      support: {
        h2: { type: String, required: true },
        h3: { type: String },
        financial: {
          h3: { type: String, required: true },
          p: { type: String },
        },
        prayer: {
          h3: { type: String, required: true },
          p: { type: String },
        },
      },
    },
    point_man: {
      title: { type: String, required: true },
      content: { type: String },
    },
    the_sgf: {
      title: { type: String, required: true },
      content: { type: String },
    },

    footer_info: {
      about_us: { type: String, required: true },
      location: { type: String, required: true },
      quick_links: [[{ type: String }, { type: String }]],
    },
  },
  { timestamps: true }
);

module.exports = model("BasePages", BasePagesSchema);
