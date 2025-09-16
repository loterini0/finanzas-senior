import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [userLogged, setUserLogged] = useState(!!localStorage.getItem("token"));
  const [showRegister, setShowRegister] = useState(false);

  if (!userLogged) {
    return showRegister ? (
      <div>
        <Register onRegister={() => setShowRegister(false)} />
        <p className="text-center mt-2">
          ¿Ya tienes cuenta?{" "}
          <button className="text-blue-500" onClick={() => setShowRegister(false)}>
            Inicia sesión
          </button>
        </p>
      </div>
    ) : (
      <div>
        <Login onLogin={() => setUserLogged(true)} />
        <p className="text-center mt-2">
          ¿No tienes cuenta?{" "}
          <button className="text-green-500" onClick={() => setShowRegister(true)}>
            Regístrate
          </button>
        </p>
      </div>
    );
  }

  return <Dashboard onLogout={() => { localStorage.removeItem("token"); setUserLogged(false); }} />;
}

export default App;
