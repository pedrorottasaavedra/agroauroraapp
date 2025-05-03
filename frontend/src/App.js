import { useEffect, useState } from 'react';
import React from "react";

function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/.auth/me")
      .then((res) => res.json())
      .then((data) => {
        const principal = data.clientPrincipal;

        if (!principal) {
          // No hay sesión activa → redirigir a login Entra ID
          window.location.href = "/.auth/login/aad";
        } else {
          if (principal.userRoles.includes("authenticated")) {
            setUser(principal.userDetails);
          } else {
            alert("No tienes permiso para acceder a esta aplicación.");
            window.location.href = "/.auth/login/aad";
          }
        }

        setChecking(false);
      });
  }, []);

  if (checking) {
    return <p style={{ textAlign: "center", paddingTop: "50px" }}>Verificando sesión...</p>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
    {/* Menú lateral */}
    <aside className="w-64 bg-white shadow-lg">
      <div className="p-6 text-xl font-bold border-b">AgroAurora</div>
      <nav className="mt-4 space-y-2 px-4">
        <a href="#tiemporeal" className="block py-2 px-3 rounded hover:bg-gray-200">
          Tiempo real
        </a>
        <a href="#datahistorica" className="block py-2 px-3 rounded hover:bg-gray-200">
          Data histórica
        </a>
        <a href="/.auth/logout" className="block py-2 px-3 rounded text-red-600 hover:bg-red-100 mt-10">
          Cerrar sesión
        </a>
      </nav>
    </aside>

    {/* Contenido principal */}
    <main className="flex-1 p-10">
      <h1 className="text-2xl font-semibold mb-4">Bienvenido, {user}</h1>
      <div id="tiemporeal" className="mb-10">
        <h2 className="text-xl font-medium mb-2">Tiempo real</h2>
        <p>Aquí irá el panel en vivo.</p>
      </div>
      <div id="datahistorica">
        <h2 className="text-xl font-medium mb-2">Data histórica</h2>
        <p>Se visualizarán los históricos aquí.</p>
      </div>
    </main>
  </div>
);
}

export default App;
