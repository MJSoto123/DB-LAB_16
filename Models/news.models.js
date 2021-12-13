const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: { type: String, required:true },
  author: { type: mongoose.Schema.ObjectId, ref: "Author", required:true},
  date: { type: Date, default: Date.now },
  text: { type: String, required:true },
  URL: { type: String, },
  tag: { type: String, },
  file: {
    data: Buffer,
    contentType: String,
  },
  categories: [{ name: { type: String } }],
  comments: [
    {
      name: { type: String },
      date: { type: Date },
      text: { type: String },
    },
  ],
});

module.exports = mongoose.model("News", newsSchema);