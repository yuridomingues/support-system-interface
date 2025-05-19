import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/");
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      backgroundColor: "#1976d2",
      color: "white",
      marginBottom: "2rem"
    }}>
      <div>
        <strong>Sistema de Suporte</strong>
        <Link to="/clients" style={{ marginLeft: "1rem", color: "white", textDecoration: "none" }}>Clientes</Link>
        <Link to="/tickets" style={{ marginLeft: "1rem", color: "white", textDecoration: "none" }}>Tickets</Link>
      </div>
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Sair
      </button>
    </nav>
  );
}
