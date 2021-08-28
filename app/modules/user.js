const mongoose = require("../db/connect");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, trim: true, required: true, unique: true },
  password: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema, "user");
module.exports = User;
