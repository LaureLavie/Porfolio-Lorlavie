const express = require("express");
const router = express.Router();
const Projet = require("../models/Projet");

//GET
router.get("/", async (req, res) => {
  try {
    const { domaine, competence, sort, search } = req.query;

    const filter = {};
    if (domaine) filter.domaine = new RegExp(domaine, "i");
    if (competence) filter.competence = new regExp(competence, "i");
    if (search) filter.nomProjet = new RegExp(search, "i");

    const sortOption = sort ? { [sort]: -1 } : {};

    const projets = await Projet.find(filter).sort(sortOption);
    res.json(projets);
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
      error,
    });
  }
});

//POST
router.post("/", async (req, res) => {
  const projet = new Projet(req.body);
  await projet.save();
  res.json("Projet ajouté");
});

//PUT
router.put("/:id", async (req, res) => {
  await Projet.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    message: "Projet mis à jour",
  });
});

//DELETE
router.delete("/:id", async (req, res) => {
  await Projet.findByIdAndDelete(req.params.id);
  res.json({
    message: "Projet supprimé",
  });
});

module.exports = router;
