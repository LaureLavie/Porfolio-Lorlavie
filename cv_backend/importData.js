const mongoose = require("mongoose");
require("dotenv").config();

// Import des modèles
const Experience = require("./models/Experience");
const Formation = require("./models/Formation");
const Projet = require("./models/Projet");
const Loisir = require("./models/Loisir");

// Import des données JSON
const experiencesData = require("./data/experiences.json");
const formationsData = require("./data/formations.json");
const projetsData = require("./data/projets.json");
const loisirsData = require("./data/loisirs.json");

// Fonction de conversion date française vers ISO
function frenchDateToISO(dateStr) {
  if (!dateStr || typeof dateStr !== "string") return "";
  const mois = {
    janvier: "01",
    février: "02",
    mars: "03",
    avril: "04",
    mai: "05",
    juin: "06",
    juillet: "07",
    août: "08",
    septembre: "09",
    octobre: "10",
    novembre: "11",
    décembre: "12",
  };
  // Supporte les formats "14 avril 2025" ou "avril 2025" ou "2025"
  const parts = dateStr.trim().split(" ");
  if (parts.length === 3) {
    // "14 avril 2025"
    const [jour, moisTxt, annee] = parts;
    if (mois[moisTxt]) {
      return `${annee}-${mois[moisTxt]}-${jour.padStart(2, "0")}`;
    }
  } else if (parts.length === 2) {
    // "avril 2025"
    const [moisTxt, annee] = parts;
    if (mois[moisTxt]) {
      return `${annee}-${mois[moisTxt]}-01`;
    }
  } else if (parts.length === 1 && /^\d{4}$/.test(parts[0])) {
    // "2025"
    return `${parts[0]}-01-01`;
  }
  return dateStr; // retourne tel quel si déjà OK ou vide
}

async function importData() {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Connecté à MongoDB");

    // Supprimer les données existantes (optionnel - attention !)
    await Experience.deleteMany({});
    await Formation.deleteMany({});
    await Projet.deleteMany({});
    await Loisir.deleteMany({});
    console.log("🗑️  Anciennes données supprimées");

    // Nettoyer et importer les expériences
    const cleanedExperiences = experiencesData.map((exp) => ({
      poste: exp.poste || "",
      entreprise: exp.entreprise || "",
      dateDebut: frenchDateToISO(exp.dateDebut || ""),
      dateFin: frenchDateToISO(exp.dateFin || ""),
      description: exp.description || "",
      lieu: exp.lieu || "",
      secteur: exp.secteur || "",
      lien: exp.lien || "",
      image: exp.image || "",
      motsCles: Array.isArray(exp.motsCles)
        ? exp.motsCles.join(", ")
        : exp.motsCles || "",
    }));

    // Nettoyer et importer les formations
    const cleanedFormations = formationsData.map((form) => ({
      nom: form.nom || "",
      certification: form.certification || "",
      ecole: form.ecole || "",
      dateDebut: frenchDateToISO(form.dateDebut || ""),
      dateFin: frenchDateToISO(form.dateFin || ""),
      description: form.description || "",
      lien: form.lien || "",
      domaine: form.domaine || "",
      image: form.image || "",
      motsCles: Array.isArray(form.motsCles)
        ? form.motsCles.join(", ")
        : form.motsCles || "",
    }));

    // Nettoyer et importer les projets
    const cleanedProjets = projetsData.map((proj) => ({
      nom: proj.nom || "",
      dateDebut: frenchDateToISO(proj.dateDebut || ""),
      dateFin: frenchDateToISO(proj.dateFin || ""),
      description: proj.description || "",
      lien: proj.lien || "",
      competence: proj.competence || "",
      domaine: proj.domaine || "",
      image: proj.image || "",
      motsCles: Array.isArray(proj.motsCles)
        ? proj.motsCles.join(", ")
        : proj.motsCles || "",
    }));

    // Nettoyer et importer les loisirs
    const cleanedLoisirs = loisirsData.map((loisir) => ({
      nom: loisir.nom || "",
      niveau: loisir.niveau || "",
      nbreAnnee: loisir.nbreAnnee || "",
      categorie: loisir.categorie || "",
      image: loisir.image || "",
      description: loisir.description || "",
      motsCles: Array.isArray(loisir.motsCles)
        ? loisir.motsCles.join(", ")
        : loisir.motsCles || "",
    }));

    // Insertion en masse
    const experiences = await Experience.insertMany(cleanedExperiences);
    console.log(`✅ ${experiences.length} expériences importées`);

    const formations = await Formation.insertMany(cleanedFormations);
    console.log(`✅ ${formations.length} formations importées`);

    const projets = await Projet.insertMany(cleanedProjets);
    console.log(`✅ ${projets.length} projets importés`);

    const loisirs = await Loisir.insertMany(cleanedLoisirs);
    console.log(`✅ ${loisirs.length} loisirs importés`);

    console.log("\n🎉 Import terminé avec succès !");
    console.log("\n📊 Résumé :");
    console.log(`   - Expériences : ${experiences.length}`);
    console.log(`   - Formations : ${formations.length}`);
    console.log(`   - Projets : ${projets.length}`);
    console.log(`   - Loisirs : ${loisirs.length}`);
    console.log(
      `   - TOTAL : ${
        experiences.length + formations.length + projets.length + loisirs.length
      } documents`
    );
  } catch (error) {
    console.error("❌ Erreur lors de l'import :", error);
  } finally {
    await mongoose.disconnect();
    console.log("\n👋 Déconnecté de MongoDB");
    process.exit(0);
  }
}

// Lancer l'import
importData();
