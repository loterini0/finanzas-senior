const db = require("../database");

db.run(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    tipo TEXT NOT NULL, -- ingreso / gasto
    monto REAL NOT NULL,
    fecha TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

module.exports = {};
