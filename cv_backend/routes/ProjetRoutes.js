const express = require("express");
const router = express.Router();
const Projet = require("../models/Projet");

//GET
router.get("/", async (req, res) => {
  try {
    const { domaine, competence, sort, search } = req.query;

    const filter = {};
    if (domaine) filter.domaine = new RegExp(domaine, "i"); // CORRIGÉ: RegExp avec R majuscule
    if (competence) filter.competence = new RegExp(competence, "i"); // CORRIGÉ
    if (search) filter.nom = new RegExp(search, "i"); // CORRIGÉ: nom au lieu de nomProjet

    const sortOption = sort ? { [sort]: -1 } : {};

    const projets = await Projet.find(filter).sort(sortOption);
    res.json(projets);
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
      error: error.message,
    });
  }
});

//POST
router.post("/", async (req, res) => {
  try {
    const projet = new Projet(req.body);
    await projet.save();
    res.json({ message: "Projet ajouté", projet });
  } catch (error) {
    res.status(500).json({ message: "Erreur", error: error.message });
  }
});

//PUT
router.put("/:id", async (req, res) => {
  try {
    const projet = await Projet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      message: "Projet mis à jour",
      projet,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur", error: error.message });
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Projet.findByIdAndDelete(req.params.id);
    res.json({
      message: "Projet supprimé",
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur", error: error.message });
  }
});

module.exports = router;
