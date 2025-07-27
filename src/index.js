const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); // Importa las rutas de autenticación
const userRoutes = require("./routes/users");

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Ruta básica de prueba
app.get('/', (req, res) => {
  res.send('API Node funcionando 👌');
});

// Rutas de autenticación
app.use('/auth', authRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});