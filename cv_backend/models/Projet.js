const mongoose = require("mongoose");

const projetSchema = new mongoose.Schema({
  nom: String,
  lieu: String,
  dateDebut: Date,
  dateFin: Date,
  description: String,
  lien: String,
  competence: String,
  domaine: String,
  image: String,
  motsCles: String,
});
module.exports = mongoose.model("Projet", projetSchema);
