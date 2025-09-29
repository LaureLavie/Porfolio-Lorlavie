const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String, //hashed
});
module.exports = mongoose.model("Admin", adminSchema);
