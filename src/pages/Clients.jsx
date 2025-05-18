import { useEffect, useState } from "react";
import api from "../services/api";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await api.get("/clients");
        setClients(res.data);
      } catch (err) {
        setError("Erro ao carregar clientes. Faça login novamente.");
      }
    };

    fetchClients();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Clientes</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
