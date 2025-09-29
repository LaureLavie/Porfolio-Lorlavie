const express = require("express");
const router = express.Router();
const Formation = require("../models/Formation");

//GET
router.get("/", async (req, res) => {
  try {
    const { certification, domaine, sort, search } = req.query;

    const filter = {};
    if (certification) filter.certification = new RegExp(certification, "i");
    if (domaine) filter.domaine = new RegExp(domaine, "i");
    if (search) filter.nom = new RegExp(search, "i");

    const sortOption = sort ? { [sort]: -1 } : {};

    const formations = await Formation.find(filter).sort(sortOption);
    res.json(formations);
  } catch (error) {
    res.status(500).json({
      message: "Erreur Serveur",
      error,
    });
  }
});

//POST
router.post("/", async (req, res) => {
  const formation = new Formation(req.body);
  await formation.save();
  res.json("Formation ajoutée");
});

//PUT
router.put("/:id", async (req, res) => {
  await Formation.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    message: "Formation mis à jour",
  });
});

//DELETE
router.delete("/:id", async (req, res) => {
  await Formation.findByIdAndDelete(req.params.id);
  res.json({
    message: "Formation supprimée",
  });
});

module.exports = router;
