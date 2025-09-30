const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(403).json({
      message: "Token requis",
    });
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // Le token peut contenir la propriété `id` (utilisée par le controller)
    // ou `adminId` selon la génération. On accepte les deux pour robustesse.
    req.adminId = decode.id || decode.adminId || null;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Token invalide",
    });
  }
};

module.exports = verifyToken;
