const express = require("express");
const router2 = express.Router();
const Loisir = require("../models/Loisir");

//GET
router2.get("/", async (req, res) => {
  try {
    const { categorie, niveau, search } = req.query;

    const filter = {};
    if (categorie) filter.categorie = new RegExp(categorie, "i");
    if (niveau) filter.niveau = new RegExp(niveau, "i");
    if (search) filter.nom = new RegExp(search, "i"); // CORRIGÉ: RegExp avec R majuscule

    const loisirs = await Loisir.find(filter).sort({ nbreAnnee: 1 });
    res.json(loisirs);
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
      error: error.message,
    });
  }
});

//POST
router2.post("/", async (req, res) => {
  try {
    const loisir = new Loisir(req.body);
    await loisir.save();
    res.json({ message: "Loisir ajouté", loisir });
  } catch (error) {
    res.status(500).json({ message: "Erreur", error: error.message });
  }
});

//PUT
router2.put("/:id", async (req, res) => {
  try {
    const loisir = await Loisir.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      message: "Loisir mis à jour",
      loisir,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur", error: error.message });
  }
});

//DELETE
router2.delete("/:id", async (req, res) => {
  try {
    await Loisir.findByIdAndDelete(req.params.id);
    res.json({
      message: "Loisir supprimé",
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur", error: error.message });
  }
});

module.exports = router2;
