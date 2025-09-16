// backend/src/app.js

// 🔹 Cargar variables de entorno antes de todo
require('dotenv').config();

const express = require("express");
const cors = require("cors");

// 🔹 Importar rutas
const userRoutes = require("./routes/user.routes");
const transactionRoutes = require("./routes/transaction.routes");
const assistantRoutes = require("./routes/assistant.routes");

const app = express();

// 🔹 Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Rutas
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/assistant", assistantRoutes);

// 🔹 Ruta inicial (opcional)
app.get("/", (req, res) => {
  res.send("Backend Finanzas Senior corriendo ✅");
});

// 🔹 Puerto
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

