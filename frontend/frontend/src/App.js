import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const PrivateRoute = ({ children }) => token ? children : <Navigate to="/login" />;

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Finanzas Senior</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<PrivateRoute><Dashboard onLogout={handleLogout} /></PrivateRoute>} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
