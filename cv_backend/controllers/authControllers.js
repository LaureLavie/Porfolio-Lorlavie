const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const adminExist = await Admin.findOne({ email });

    if (adminExist)
      return res.status(400).json({
        message: "Email déjà utilisé",
      });
    // Hash du mot de passe AVANT de sauvegarder
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "Administrateur crée avec succès",
      admin: newAdmin,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur Serveur",
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }
    const isMatch = bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: `Bearer ${token}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur Serveur",
      error,
    });
  }
};

const logout = async (req, res) => {
  res.status(200).json({
    message: "Deconnexion réussie",
  });
};

module.exports = { register, login, logout };
