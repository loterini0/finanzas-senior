import React, { useState } from "react";

export default function Transactions({ transactions, token, fetchTransactions }) {
  const [tipo, setTipo] = useState("ingreso");
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState("");

  const addTransaction = async () => {
    if (!monto || !fecha) return;
    try {
      const res = await fetch("/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ tipo, monto: parseFloat(monto), fecha }),
      });
      if (res.ok) {
        setMonto("");
        setFecha("");
        fetchTransactions();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
      <h3>Agregar Transacción</h3>
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="ingreso">Ingreso</option>
        <option value="gasto">Gasto</option>
      </select>
      <input
        type="number"
        placeholder="Monto"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
      />
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />
      <button onClick={addTransaction}>Agregar</button>

      <h3>Transacciones</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Monto</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.tipo}</td>
              <td>{t.monto}</td>
              <td>{t.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
