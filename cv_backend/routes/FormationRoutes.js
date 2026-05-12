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

// POST - Ajouter (Sécurisé)
router.post("/", verifyToken, async (req, res) => {
  try {
    const formation = new Formation(req.body);
    await formation.save();
    res.json({ message: "Formation ajoutée", formation });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout", error });
  }
});

// PUT - Modifier (Sécurisé)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const formation = await Formation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Formation mise à jour", formation });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour" });
  }
});

// DELETE - Supprimer (Sécurisé)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Formation.findByIdAndDelete(req.params.id);
    res.json({ message: "Formation supprimée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
});

module.exports = router;
