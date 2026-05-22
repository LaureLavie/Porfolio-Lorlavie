const express = require("express");
const router = express.Router();
const Experience = require("../models/Experience");
const verifyToken= require("../middlewares/auth");

//GET
router.get("/", async (req, res) => {
  try {
    const { entreprise, domaine, sort, search } = req.query;

    const filter = {};
    if (entreprise) filter.entreprise = new RegExp(entreprise, "i");
    if (domaine) filter.secteur = new RegExp(domaine, "i");
    if (search) filter.poste = new RegExp(search, "i");

    const sortOption = sort ? { [sort]: -1 } : {};

    const experiences = await Experience.find(filter).sort(sortOption);
    res.json(experiences);
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
      error,
    });
  }
});

// POST - Ajouter (Sécurisé)
router.post("/", verifyToken, async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.json({ message: "Expérience ajoutée", experience });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout", error });
  }
});

// PUT - Modifier (Sécurisé)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Expérience mise à jour", experience });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour" });
  }
});

// DELETE - Supprimer (Sécurisé)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: "Expérience supprimée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
});

module.exports = router;
