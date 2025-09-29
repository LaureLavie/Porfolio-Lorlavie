const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const authRoutes = require("./routes/AuthRoutes");
const adminDashboardRoutes = require("./routes/adminDashboardRoutes");
const contactRoutes = require("./routes/ContactRoutes");
const experienceRoutes = require("./routes/ExperienceRoutes");
const formationRoutes = require("./routes/FormationRoutes");
const projetRoutes = require("./routes/ProjetRoutes");
const loisirRoutes = require("./routes/LoisirRoutes");

const verifyToken = require("./middlewares/auth");
const app = express();
app.use(cors());
app.use(express.json());

// Route pour formations
app.get("/api/formations", (req, res) => {
  fs.readFile(
    path.join(__dirname, "data/formations.json"),
    "utf8",
    (err, data) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Erreur lecture fichier formations" });
      res.json(JSON.parse(data));
    }
  );
});

// Route pour loisirs
app.get("/api/loisirs", (req, res) => {
  fs.readFile(
    path.join(__dirname, "data/loisirs.json"),
    "utf8",
    (err, data) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Erreur lecture fichier loisirs" });
      res.json(JSON.parse(data));
    }
  );
});

// Route pour projets
app.get("/api/projets", (req, res) => {
  fs.readFile(
    path.join(__dirname, "data/projets.json"),
    "utf8",
    (err, data) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Erreur lecture fichier projets" });
      res.json(JSON.parse(data));
    }
  );
});

// Route pour expériences
app.get("/api/experiences", (req, res) => {
  fs.readFile(
    path.join(__dirname, "data/experiences.json"),
    "utf8",
    (err, data) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Erreur lecture fichier expériences" });
      res.json(JSON.parse(data));
    }
  );
});

// Route pour le tableau de bord admin avec filtres
app.get("/api/admin/dashboard/filtered", verifyToken, async (req, res) => {
  const { categorieExperience, certificationFormation, categorieProjet } =
    req.query;

  try {
    // Récupérer les données nécessaires de MongoDB
    const experiences = await Experience.find({
      ...(categorieExperience && { categorie: categorieExperience }),
    });
    const formations = await Formation.find({
      ...(certificationFormation && { certification: certificationFormation }),
    });
    const projets = await Projet.find({
      ...(categorieProjet && { categorie: categorieProjet }),
    });

    res.json({ experiences, formations, projets });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/formation", formationRoutes);
app.use("/api/projet", projetRoutes);
app.use("/api/loisir", loisirRoutes);

const PORT = process.env.PORT;

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected on MongoDB");
    app.listen(PORT, () => {
      console.log(`Server on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erreur de connexion à Mongo DB", error);
  }
}

connect();
