const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../database");

const registerUser = (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) {
    return res.status(400).json({ message: "Nombre, email y password son requeridos" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run(
    `INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)`,
    [nombre, email, hashedPassword],
    function (err) {
      if (err) return res.status(500).json({ message: "Error al registrar usuario", error: err.message });
      res.status(201).json({ id: this.lastID, nombre, email });
    }
  );
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email y password requeridos" });

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err) return res.status(500).json({ message: "Error en DB" });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Credenciales inválidas" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login exitoso", token });
  });
};

module.exports = { registerUser, loginUser };
