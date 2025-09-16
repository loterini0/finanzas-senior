const db = require("../database");

const createTransaction = (req, res) => {
  const { tipo, monto, fecha } = req.body;
  const userId = req.user.id;

  if (!tipo || !monto || !fecha) {
    return res.status(400).json({ message: "Tipo, monto y fecha son requeridos" });
  }

  db.run(
    `INSERT INTO transactions (user_id, tipo, monto, fecha) VALUES (?, ?, ?, ?)`,
    [userId, tipo, monto, fecha],
    function (err) {
      if (err) return res.status(500).json({ message: "Error al registrar transacción", error: err.message });
      res.status(201).json({ id: this.lastID, tipo, monto, fecha });
    }
  );
};

const getTransactions = (req, res) => {
  const userId = req.user.id;
  db.all(`SELECT * FROM transactions WHERE user_id = ?`, [userId], (err, rows) => {
    if (err) return res.status(500).json({ message: "Error al obtener transacciones" });
    res.json(rows);
  });
};

module.exports = { createTransaction, getTransactions };
