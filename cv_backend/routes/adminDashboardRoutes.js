const express = require("express");
const router = express.Router();
const Experience = require("../models/Experience");
const Formation = require("../models/Formation");
const Projet = require("../models/Projet");
const Loisir = require("../models/Loisir");

//route API pour récupérer le tableau de nord admin
router.get("/", async (req, res) => {
  try {
    //comptage total par catégorie
    const [nbExperiences, nbFormations, nbProjets, nbLoisirs] =
      await Promise.all([
        //prend en argument un tableau de promesse et retourne une nouvelle promesse qui se résout lorsque toutes les promesses du tableau sont résolues.
        Experience.countDocuments(), //compte le nombre de docs dans la collection mongoDB
        Formation.countDocuments(),
        Projet.countDocuments(),
        Loisir.countDocuments(),
      ]);
    //dernières mises à jour
    const lastExperiences = await Experience.findOne().sort({ dateFin: -1 });
    const lastFormation = await Formation.findOne().sort({ dateFin: -1 });
    const lastProjet = await Projet.findOne().sort({ dateDebut: -1 });

    res.json({
      Statistiques: {
        experiences: nbExperiences,
        formations: nbFormations,
        projets: nbProjets,
        loisir: nbLoisirs,
      },
      lastAdded: {
        derniereExperience: lastExperiences,
        derniereFormation: lastFormation,
        dernierProjet: lastProjet,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
      error,
    });
  }
});

router.get("/filtered", async (req, res) => {
  try {
    const { categorieExperience, certificationFormation, categorieProjet } =
      req.query;

    const filters = {};
    if (categorieExperience)
      filters.experienceFilter = {
        categorie: new RegExp(categorieExperience, "i"), //RegExp construite à partir de la valeur de categorieExperience, avec le drapeau "i" pour indiquer une recherche insensible à la casse
      };
    if (certificationFormation)
      filters.formationFilter = {
        certification: new RegExp(certificationFormation, "i"),
      };
    if (categorieProjet)
      filters.projetsFilter = {
        categorie: new RegExp(categorieProjet, "i"),
      };

    const [experiences, formations, projets] = await Promise.all([
      Experience.find(filters.experienceFilter),
      Formation.find(filters.formationFilter),
      Projet.find(filters.projetsFilter),
    ]);
    res.json({ experiences, formations, projets });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur, error",
    });
  }
});

module.exports = router;
