const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');

/*const users = [
  {
    name: "admin",
    email: "admin@spsgroup.com.br",
    type: "admin",
    password: "1234"
  }
];*/
const { users } = require('../shared/usersData');
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

router.post("/register", (req, res) => {
  const { name, email, password, type } = req.body;

  const userExists = users.find(u => u.email === email);

  if (userExists) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }

  const newUser = { name, email, password, type };
  users.push(newUser);

  return res.status(201).json({ message: "Usuario registrado correctamente" });
});

router.delete("/users/:email", authenticateToken, (req, res) => {
  const { email } = req.params;

  const index = users.findIndex(u => u.email === email);
  if (index === -1) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  users.splice(index, 1);
  return res.json({ message: "Usuario eliminado correctamente" });
});


router.post("/update/:email", authenticateToken, (req, res) => {
  const { email } = req.params;
  const userIndex = users.findIndex(u => u.email === email);

  if (userIndex === -1) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  const { name, type, password } = req.body;

  if (name) users[userIndex].name = name;
  if (type) users[userIndex].type = type;
  if (password) users[userIndex].password = password;

  return res.json({ message: "Usuario actualizado correctamente" });
});



module.exports = router;