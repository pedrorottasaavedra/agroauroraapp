import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/.auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.clientPrincipal) {
          setUser(data.clientPrincipal.userDetails);
        }
      });
  }, []);

  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      {user ? (
        <h1>Bienvenido, {user}!</h1>
      ) : (
        <a href="/.auth/login/aad">Iniciar sesión con Entra ID</a>
      )}
    </div>
  );
}

export default App;