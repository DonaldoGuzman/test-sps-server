const jwt = require("jsonwebtoken");

const SECRET_KEY = "clave-super-secreta"; // Debe ser la misma usada para firmar el token

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Espera: Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido" });
    }

    req.user = user; // Guardamos los datos del usuario autenticado
    next();
  });
}

module.exports = authenticateToken;
