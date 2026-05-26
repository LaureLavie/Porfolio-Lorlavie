const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const authRoutes = require("./routes/AuthRoutes");
const adminDashboardRoutes = require("./routes/AdminDashboardRoutes");
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
const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow non browser clients (curl, server-to-server) which have no origin
      if (!origin) return callback(null, true);
      // if no allowedOrigins configured, allow any origin (useful for quick testing)
      if (allowedOrigins.length === 0) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  })
);

app.use(express.json());

// ROUTES JSON DIRECTES (lecture des fichiers data/)
app.get('/api/json/formations', async (req, res) => {
  try {
    const raw = await fs.promises.readFile(path.join(__dirname, 'data', 'formations.json'), 'utf8');
    return res.json(JSON.parse(raw));
  } catch (err) {
    console.error('Erreur lecture formations.json', err);
    return res.status(500).json({ error: 'Erreur lecture formations' });
  }
});

app.get('/api/json/experiences', async (req, res) => {
  try {
    const raw = await fs.promises.readFile(path.join(__dirname, 'data', 'experiences.json'), 'utf8');
    return res.json(JSON.parse(raw));
  } catch (err) {
    console.error('Erreur lecture experiences.json', err);
    return res.status(500).json({ error: 'Erreur lecture experiences' });
  }
});

app.get('/api/json/projets', async (req, res) => {
  try {
    const raw = await fs.promises.readFile(path.join(__dirname, 'data', 'projets.json'), 'utf8');
    return res.json(JSON.parse(raw));
  } catch (err) {
    console.error('Erreur lecture projets.json', err);
    return res.status(500).json({ error: 'Erreur lecture projets' });
  }
});

app.get('/api/json/loisirs', async (req, res) => {
  try {
    const raw = await fs.promises.readFile(path.join(__dirname, 'data', 'loisirs.json'), 'utf8');
    return res.json(JSON.parse(raw));
  } catch (err) {
    console.error('Erreur lecture loisirs.json', err);
    return res.status(500).json({ error: 'Erreur lecture loisirs' });
  }
});

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
  // baseUrl : utiliser process.env.API_URL si défini, sinon construire dynamiquement
    const baseUrl = process.env.API_URL || `${req.protocol}://${req.get("host")}`;
    const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
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
app.use("/api/contact", contactRoutes);
app.use("/api/export", exportRoutes);

// Routes CRUD (Accessibles pour l'admin)
app.use("/api/admin/dashboard", adminDashboardRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/formation", formationRoutes);
app.use("/api/projet", projetRoutes);
app.use("/api/loisir", loisirRoutes);

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
