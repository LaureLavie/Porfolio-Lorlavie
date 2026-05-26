const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.get("/api/projets", (req, res) => {
  fs.readFile(
    path.join(__dirname, "./data/projets.json"),
    "utf8",
    (err, data) => {
      if (err) return res.status(500).json({ error: "Erreur lecture fichier" });
      res.json(JSON.parse(data));
    }
  );
});

app.get("/api/experiences", (req, res) => {
  fs.readFile(
    path.join(__dirname, "./data/experiences.json"),
    "utf8",
    (err, data) => {
      if (err) return res.status(500).json({ error: "Erreur lecture fichier" });
      res.json(JSON.parse(data));
    }
  );
});

app.get("/api/formations", (req, res) => {
  fs.readFile(
    path.join(__dirname, "./data/formations.json"),
    "utf8",
    (err, data) => {
      if (err) return res.status(500).json({ error: "Erreur lecture fichier" });
      res.json(JSON.parse(data));
    }
  );
});

app.get("/api/loisirs", (req, res) => {
  fs.readFile(
    path.join(__dirname, "./data/loisirs.json"),
    "utf8",
    (err, data) => {
      if (err) return res.status(500).json({ error: "Erreur lecture fichier" });
      res.json(JSON.parse(data));
    }
  );
});
