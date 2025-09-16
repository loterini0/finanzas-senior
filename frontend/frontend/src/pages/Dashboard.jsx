import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard({ onLogout }) {
  // Cargar datos desde localStorage al iniciar
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [tipo, setTipo] = useState("ingreso");
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Guardar cambios en localStorage cada vez que transactions cambie
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = () => {
    if (!monto || !fecha) return;
    const newTransaction = { id: Date.now(), tipo, monto: parseFloat(monto), fecha };
    setTransactions([...transactions, newTransaction]);
    setMonto("");
    setFecha("");
  };

  const askAssistant = () => {
    if (!question) return;
    setAnswer("Respuesta simulada del asistente: ¡Hola! Aquí tienes tu información financiera.");
  };

  const totalIngresos = transactions
    .filter(t => t.tipo === "ingreso")
    .reduce((a,b) => a + b.monto, 0);

  const totalGastos = transactions
    .filter(t => t.tipo === "gasto")
    .reduce((a,b) => a + b.monto, 0);

  const balance = totalIngresos - totalGastos;

  const chartData = {
    labels: transactions.map(t => t.fecha),
    datasets: [
      {
        label: "Ingresos",
        data: transactions.map(t => (t.tipo === "ingreso" ? t.monto : 0)),
        backgroundColor: "green",
      },
      {
        label: "Gastos",
        data: transactions.map(t => (t.tipo === "gasto" ? t.monto : 0)),
        backgroundColor: "red",
      },
    ],
  };

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Dashboard</h2>
        <button onClick={onLogout} style={{ background: "red", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px" }}>
          Logout
        </button>
      </div>

      {/* Resumen */}
      <div style={{ display: "flex", justifyContent: "space-around", margin: "20px 0" }}>
        <div style={{ padding: "15px", borderRadius: "8px", background: "#d4edda", width: "30%", textAlign: "center" }}>
          <h4>Ingresos</h4>
          <p style={{ color: "#155724", fontWeight: "bold" }}>${totalIngresos}</p>
        </div>
        <div style={{ padding: "15px", borderRadius: "8px", background: "#f8d7da", width: "30%", textAlign: "center" }}>
          <h4>Gastos</h4>
          <p style={{ color: "#721c24", fontWeight: "bold" }}>${totalGastos}</p>
        </div>
        <div style={{ padding: "15px", borderRadius: "8px", background: "#cce5ff", width: "30%", textAlign: "center" }}>
          <h4>Balance</h4>
          <p style={{ color: "#004085", fontWeight: "bold" }}>${balance}</p>
        </div>
      </div>

      {/* Formulario */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Agregar Transacción</h3>
        <select value={tipo} onChange={e => setTipo(e.target.value)} style={{ marginRight: "5px" }}>
          <option value="ingreso">Ingreso</option>
          <option value="gasto">Gasto</option>
        </select>
        <input type="number" placeholder="Monto" value={monto} onChange={e => setMonto(e.target.value)} style={{ marginRight: "5px" }} />
        <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} style={{ marginRight: "5px" }} />
        <button onClick={addTransaction} style={{ background: "blue", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px" }}>Agregar</button>
      </div>

      {/* Tabla */}
      <h3>Transacciones</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th style={{ border: "1px solid #ccc", padding: "5px" }}>Tipo</th>
            <th style={{ border: "1px solid #ccc", padding: "5px" }}>Monto</th>
            <th style={{ border: "1px solid #ccc", padding: "5px" }}>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t,i) => (
            <tr key={t.id} style={{ background: i%2===0?"#fff":"#f9f9f9" }}>
              <td style={{ color: t.tipo==="ingreso"?"green":"red", padding: "5px" }}>{t.tipo}</td>
              <td style={{ padding: "5px" }}>{t.monto}</td>
              <td style={{ padding: "5px" }}>{t.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Gráfico */}
      <div style={{ marginTop: "20px" }}>
        <h3>Visualización de Ingresos y Gastos</h3>
        <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
      </div>

      {/* Asistente IA */}
      <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h3>Asistente IA</h3>
        <textarea value={question} onChange={e => setQuestion(e.target.value)} placeholder="Pregunta..." style={{ width: "100%", padding: "5px" }} />
        <button onClick={askAssistant} style={{ marginTop:"5px", background: "purple", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px" }}>Preguntar</button>
        {answer && <div style={{ marginTop:"10px", padding:"10px", border:"1px solid #ccc", borderRadius:"6px" }}>{answer}</div>}
      </div>
    </div>
  );
}
