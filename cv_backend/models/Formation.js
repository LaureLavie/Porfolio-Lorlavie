const mongoose = require("mongoose");

const formationSchema = new mongoose.Schema({
  nom: String,
  certification: String,
  lieu: String,
  ecole: String,
  dateDebut: Date,
  dateFin: Date,
  description: String,
  lien: String,
  domaine: String,
  image: String,
  motsCles: String,
});
module.exports = mongoose.model("Formation", formationSchema);
