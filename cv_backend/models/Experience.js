const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  poste: String,
  entreprise: String,
  lieu: String,
  dateDebut: Date,
  dateFin: Date,
  description: String,
  lien: String,
  secteur: String,
  image: String,
  motsCles: String,
});
module.exports = mongoose.model("Experience", experienceSchema);
