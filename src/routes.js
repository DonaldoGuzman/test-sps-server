const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const users = [
  {
    name: "admin",
    email: "admin@spsgroup.com.br",
    type: "admin",
    password: "1234"
  }
];

const SECRET_KEY = "clave-super-secreta";

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const token = jwt.sign(
    { email: user.email, type: user.type }, 
    SECRET_KEY, 
    { expiresIn: "1h" }
  );

  return res.json({ token });
});

module.exports = router;