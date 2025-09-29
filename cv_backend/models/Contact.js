const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
  adresse: String,
});
module.exports = mongoose.model("Contact", contactSchema);
