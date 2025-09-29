const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(403).json({
      message: "Token requis",
    });
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decode.adminId;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Token invalide",
    });
  }
};

module.exports = verifyToken;
