import { useEffect, useState } from 'react';

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
            window.location.href = "/.auth/logout";
          }
        }

        setChecking(false);
      });
  }, []);

  if (checking) {
    return <p style={{ textAlign: "center", paddingTop: "50px" }}>Verificando sesión...</p>;
  }

  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <h1>Bienvenido, {user}!</h1>
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer"
        }}
        onClick={() => window.location.href = "/.auth/logout"}
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default App;
  