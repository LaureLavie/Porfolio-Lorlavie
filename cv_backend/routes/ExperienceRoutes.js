const express = require("express");
const router = express.Router();
const Experience = require("../models/Experience");

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

//POST
router.post("/", async (req, res) => {
  const experience = new Experience(req.body);
  await experience.save();
  res.json("Experience ajoutée");
});

//PUT
router.put("/:id", async (req, res) => {
  await Experience.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    message: "Experience mis à jour",
  });
});

//DELETE
router.delete("/:id", async (req, res) => {
  await Experience.findByIdAndDelete(req.params.id);
  res.json({
    message: "Experience supprimée",
  });
});

module.exports = router;
