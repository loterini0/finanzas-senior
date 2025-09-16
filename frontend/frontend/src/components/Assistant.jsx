import React, { useState } from "react";

export default function Assistant({ token }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAssistant = async () => {
    if (!question) return;
    try {
      const res = await fetch("/assistant/query", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      console.error(err);
      setAnswer("Error al comunicarse con el asistente");
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
      <h3>Asistente IA</h3>
      <textarea
        placeholder="Escribe tu pregunta..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={3}
        style={{ width: "100%" }}
      />
      <button onClick={askAssistant}>Preguntar</button>
      {answer && (
        <div style={{ marginTop: "5px", padding: "5px", border: "1px solid #eee" }}>
          <strong>Respuesta:</strong> {answer}
        </div>
      )}
    </div>
  );
}
