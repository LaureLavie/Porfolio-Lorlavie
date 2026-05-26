const express = require("express");
const router = express.Router();
const Experience = require("../models/Experience");
const Formation = require("../models/Formation");
const Projet = require("../models/Projet");
const Loisir = require("../models/Loisir");
const verifyToken = require("../middlewares/auth");
const PDFDocument = require("pdfkit");

// Export toutes les données en JSON
router.get("/json", verifyToken, async (req, res) => {
  try {
    const [experiences, formations, projets, loisirs] = await Promise.all([
      Experience.find(),
      Formation.find(),
      Projet.find(),
      Loisir.find(),
    ]);

    const data = {
      experiences,
      formations,
      projets,
      loisirs,
      exportDate: new Date().toISOString(),
    };

    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=cv-data-${Date.now()}.json`
    );
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de l'export", details: error.message });
  }
});

// Export en CSV
router.get("/csv/:type", verifyToken, async (req, res) => {
  try {
    const { type } = req.params;
    let data, headers;

    switch (type) {
      case "experiences":
        data = await Experience.find();
        headers = [
          "Poste",
          "Entreprise",
          "Lieu",
          "Date Début",
          "Date Fin",
          "Secteur",
          "Description",
        ];
        break;
      case "formations":
        data = await Formation.find();
        headers = [
          "Nom",
          "Certification",
          "École",
          "Lieu",
          "Date Début",
          "Date Fin",
          "Domaine",
          "Description",
        ];
        break;
      case "projets":
        data = await Projet.find();
        headers = [
          "Nom",
          "Lieu",
          "Date Début",
          "Date Fin",
          "Domaine",
          "Compétences",
          "Description",
        ];
        break;
      case "loisirs":
        data = await Loisir.find();
        headers = ["Nom", "Niveau", "Nombre d'années", "Description"];
        break;
      default:
        return res.status(400).json({ error: "Type invalide" });
    }

    let csv = headers.join(",") + "\n";

    data.forEach((item) => {
      const row = headers.map((header) => {
        const key = header.toLowerCase().replace(/ /g, "").replace(/'/g, "");
        let value = item[key] || "";
        if (typeof value === "string") {
          value = value.replace(/"/g, '""');
          if (value.includes(",") || value.includes("\n")) {
            value = `"${value}"`;
          }
        }
        return value;
      });
      csv += row.join(",") + "\n";
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${type}-${Date.now()}.csv`
    );
    res.send(csv);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de l'export CSV", details: error.message });
  }
});

// Export CV en PDF
router.get("/pdf", verifyToken, async (req, res) => {
  try {
    const [experiences, formations, projets, loisirs] = await Promise.all([
      Experience.find().sort({ dateFin: -1 }),
      Formation.find().sort({ dateFin: -1 }),
      Projet.find().sort({ dateDebut: -1 }),
      Loisir.find(),
    ]);

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=CV-Laure-Lavie-${Date.now()}.pdf`
    );

    doc.pipe(res);

    // En-tête
    doc.fontSize(24).text("Laure Lavie", { align: "center" });
    doc
      .fontSize(12)
      .text("laure.lavie@gmail.com | 06.86.63.60.73", { align: "center" });
    doc.moveDown();

    // Formations
    doc.fontSize(18).text("Formations", { underline: true });
    doc.moveDown(0.5);
    formations.forEach((formation) => {
      doc
        .fontSize(14)
        .text(`${formation.nom}`, { continued: true })
        .fontSize(10)
        .text(` - ${formation.ecole}`);
      doc
        .fontSize(10)
        .text(`${formation.dateDebut || ""} - ${formation.dateFin || ""}`, {
          indent: 20,
        });
      if (formation.description) {
        doc.fontSize(10).text(formation.description, { indent: 20 });
      }
      doc.moveDown(0.5);
    });

    // Expériences
    doc.addPage();
    doc.fontSize(18).text("Expériences Professionnelles", { underline: true });
    doc.moveDown(0.5);
    experiences.forEach((exp) => {
      doc
        .fontSize(14)
        .text(`${exp.poste}`, { continued: true })
        .fontSize(10)
        .text(` - ${exp.entreprise}`);
      doc
        .fontSize(10)
        .text(`${exp.dateDebut || ""} - ${exp.dateFin || "Aujourd'hui"}`, {
          indent: 20,
        });
      if (exp.description) {
        doc.fontSize(10).text(exp.description, { indent: 20 });
      }
      doc.moveDown(0.5);
    });

    // Projets
    if (projets.length > 0) {
      doc.addPage();
      doc.fontSize(18).text("Projets", { underline: true });
      doc.moveDown(0.5);
      projets.forEach((projet) => {
        doc.fontSize(14).text(projet.nom);
        doc
          .fontSize(10)
          .text(`${projet.dateDebut || ""} - ${projet.dateFin || ""}`, {
            indent: 20,
          });
        if (projet.description) {
          doc.fontSize(10).text(projet.description, { indent: 20 });
        }
        doc.moveDown(0.5);
      });
    }

    // Loisirs
    if (loisirs.length > 0) {
      doc.fontSize(18).text("Loisirs & Centres d'intérêt", { underline: true });
      doc.moveDown(0.5);
      loisirs.forEach((loisir) => {
        doc.fontSize(12).text(`${loisir.nom}`, { continued: true });
        if (loisir.niveau) {
          doc.fontSize(10).text(` (${loisir.niveau})`);
        } else {
          doc.text("");
        }
      });
    }

    doc.end();
  } catch (error) {
    console.error("Erreur PDF:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de l'export PDF", details: error.message });
  }
});

// Import depuis JSON
router.post("/import", verifyToken, async (req, res) => {
  try {
    const { experiences, formations, projets, loisirs } = req.body;

    const promises = [];

    if (experiences) {
      promises.push(Experience.insertMany(experiences));
    }
    if (formations) {
      promises.push(Formation.insertMany(formations));
    }
    if (projets) {
      promises.push(Projet.insertMany(projets));
    }
    if (loisirs) {
      promises.push(Loisir.insertMany(loisirs));
    }

    await Promise.all(promises);

    res.json({ message: "Import réussi !" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de l'import", details: error.message });
  }
});

module.exports = router;
