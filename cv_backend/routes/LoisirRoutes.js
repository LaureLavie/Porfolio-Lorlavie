const express = require("express");
const router = express.Router();
const Loisir = require("../models/Loisir");

//GET
router.get("/", async (req, res) => {
  try {
    const { categorie, niveau, search } = req.query;

    const filter = {};
    if (categorie) filter.categorie = new RegExp(categorie, "i");
    if (niveau) filter.niveau = new RegExp(niveau, "i");
    if (search) filter.nom = new Regexp(search, "i");

    const loisirs = await Loisir.find(filter).sort({ nbreAnnee: 1 });
    res.json(loisirs);
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
    });
  }
});

//POST
router.post("/", async (req, res) => {
  const loisir = new Loisir(req.body);
  await loisir.save();
  res.json("Loisir ajouté");
});

//PUT
router.put("/:id", async (req, res) => {
  await Loisir.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    message: "Loisir mis à jour",
  });
});

//DELETE
router.delete("/:id", async (req, res) => {
  await Loisir.findByIdAndDelete(req.params.id);
  res.json({
    message: "Loisir supprimé",
  });
});

module.exports = router;
