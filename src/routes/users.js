const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Repositorio en memoria
/*const users = [
  {
    name: "admin",
    email: "admin@spsgroup.com.br",
    type: "admin",
    password: "1234"
  }
];*/
const { users } = require('../shared/usersData');
// Listar usuarios (solo autenticado)
router.get("/", authenticateToken, (req, res) => {
  res.json(users);
});

// Crear nuevo usuario
router.post("/", authenticateToken, (req, res) => {
  const { name, email, type, password } = req.body;

  if (!name || !email || !type || !password) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  const existing = users.find(u => u.email === email);
  if (existing) {
    return res.status(409).json({ message: "El email ya está registrado" });
  }

  users.push({ name, email, type, password });
  res.status(201).json({ message: "Usuario creado con éxito" });
});

// Modificar usuario
router.put("/:email", authenticateToken, (req, res) => {
  const { email } = req.params;
  const { name, type, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  if (name) user.name = name;
  if (type) user.type = type;
  if (password) user.password = password;

  res.json({ message: "Usuario actualizado correctamente" });
});

// Eliminar usuario
router.delete("/:email", authenticateToken, (req, res) => {
  const { email } = req.params;
  const index = users.findIndex(u => u.email === email);

  if (index === -1) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  users.splice(index, 1);
  res.json({ message: "Usuario eliminado correctamente" });
});

module.exports = router;
