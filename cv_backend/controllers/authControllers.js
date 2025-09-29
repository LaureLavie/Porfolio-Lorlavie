const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérifier si l'email existe déjà
    const adminExist = await Admin.findOne({ email });
    if (adminExist) {
      return res.status(400).json({
        message: "Email déjà utilisé",
      });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'admin
    const newAdmin = await Admin.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Administrateur créé avec succès",
      admin: {
        id: newAdmin._id,
        username: newAdmin.username,
        email: newAdmin.email,
      },
    });
  } catch (error) {
    console.error("Erreur register:", error);
    res.status(500).json({
      message: "Erreur Serveur",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'admin existe
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    // Vérifier le mot de passe (IMPORTANT: ajouter await)
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    // Créer le token JWT
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" } // Augmenté à 24h
    );

    res.status(200).json({
      message: "Connexion réussie",
      token: token, // Pas besoin du préfixe "Bearer" ici
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Erreur login:", error);
    res.status(500).json({
      message: "Erreur Serveur",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    // Le logout côté serveur est simple avec JWT
    // Le vrai logout se fait côté client en supprimant le token
    res.status(200).json({
      message: "Déconnexion réussie",
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la déconnexion",
      error: error.message,
    });
  }
};

module.exports = { register, login, logout };
