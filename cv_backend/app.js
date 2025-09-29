const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const authRoutes = require("./routes/AuthRoutes");
const adminDashboardRoutes = require("./routes/adminDashboardRoutes");
const contactRoutes = require("./routes/ContactRoutes");
const experienceRoutes = require("./routes/ExperienceRoutes");
const formationRoutes = require("./routes/FormationRoutes");
const projetRoutes = require("./routes/ProjetRoutes");
const loisirRoutes = require("./routes/LoisirRoutes");
const exportRoutes = require("./routes/ExportRoutes");

const Experience = require("./models/Experience");
const Formation = require("./models/Formation");
const Projet = require("./models/Projet");
const Loisir = require("./models/Loisir");

const verifyToken = require("./middlewares/auth");
const app = express();

// Configuration CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

// Créer le dossier uploads s'il n'existe pas
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuration Multer pour l'upload d'images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Seules les images sont autorisées !"));
  },
});

// Servir les fichiers statiques
app.use("/uploads", express.static("uploads"));

// Route pour upload d'image
app.post("/api/upload", verifyToken, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Aucun fichier uploadé" });
  }
  const imageUrl = `${process.env.API_URL}/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

// Route pour le tableau de bord admin avec filtres
app.get("/api/admin/dashboard/filtered", verifyToken, async (req, res) => {
  const { categorieExperience, certificationFormation, categorieProjet } =
    req.query;

  try {
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

// Routes principales
app.use("/api/auth", authRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/formation", formationRoutes);
app.use("/api/projet", projetRoutes);
app.use("/api/loisir", loisirRoutes);
app.use("/api/export", exportRoutes);

const PORT = process.env.PORT || 3000;

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected on MongoDB");
    app.listen(PORT, () => {
      console.log(`Server on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erreur de connexion à MongoDB", error);
  }
}

connect();
