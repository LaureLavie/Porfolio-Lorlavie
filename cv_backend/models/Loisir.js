const mongoose = require("mongoose");

const loisirSchema = new mongoose.Schema({
  nom: String,
  niveau: String, //Débutant/ Intermédiare/Avancé
  nbreAnnee: String,
  image: String,
  description: String,
});
module.exports = mongoose.model("Loisir", loisirSchema);
