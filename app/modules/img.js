const mongoose = require("../db/connect");
const Schema = mongoose.Schema;

const imgSchema = new Schema(
  {
    username: { type: String, required: true, index: true },
    name: { type: String, unique: true },
    size: { type: Number },
    type: { type: String },
    path: { type: String },
    originalPath: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const img = mongoose.model("img", imgSchema, "imgList");
module.exports = img;
