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
          // No hay sesión activa → forzar login con Entra ID
          window.location.href = "/.auth/login/aad";
        } else {
          // Validar que tenga el rol "authenticated"
          if (principal.userRoles.includes("authenticated")) {
            setUser(principal.userDetails);
          } else {
            // Si no tiene rol adecuado, mostrar mensaje claro
            alert("No tienes permisos para acceder a esta aplicación.");
            window.location.href = "/.auth/logout";
          }
        }

        setChecking(false);
      });
  }, []);

  if (checking) return <p style={{ textAlign: "center" }}>Verificando sesión...</p>;

  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      {user ? <h1>Bienvenido, {user}!</h1> : null}
    </div>
  );
}

export default App;
