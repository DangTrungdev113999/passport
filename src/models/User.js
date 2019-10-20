const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: String,
  password: String,
  phone: {type: Number, default: null},
  address: {type: String, default: null},
  type: {type: Number, default: 3},
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: null },
  deletedAt: {  type: Number, default: null  }
})   // collecyion: "..." not change name collection

const User  = mongoose.model("user", UserSchema);

module.exports = User;