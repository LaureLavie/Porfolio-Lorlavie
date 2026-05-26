const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");

const Experience = require("../models/Experience");
const Formation = require("../models/Formation");
const Projet = require("../models/Projet");
const Loisir = require("../models/Loisir");

// POST /api/admin/dashboard - renvoie un objet récapitulatif pour le dashboard
router.post("/", verifyToken, async (req, res) => {
  try {
    const [experiences, formations, projets, loisirs] = await Promise.all([
      Experience.find(),
      Formation.find(),
      Projet.find(),
      Loisir.find(),
    ]);

    res.json({ experiences, formations, projets, loisirs });
  } catch (error) {
    console.error("Erreur dashboard:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

module.exports = router;
// NOTE: Frontend React component accidentally pasted here was removed.
// The Admin dashboard React component lives in cv_frontend/src/pages/AdminDashboard.jsx
