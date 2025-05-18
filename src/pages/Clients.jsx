import { useEffect, useState } from "react";
import api from "../services/api";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchClients = async () => {
    try {
      const res = await api.get("/clients");
      setClients(res.data);
    } catch (err) {
      setError("Erro ao carregar clientes. Faça login novamente.");
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (editingId) {
          await api.put(`/clients/${editingId}`, {
            name,
            email,
            phone,
      });
    }   else {
        await api.post("/clients", {
          name,
          email,
          phone,
      });
    }
      setName("");
      setEmail("");
      setPhone("");
      setEditingId(null);
      fetchClients();
    } catch (err) {
      setError("Erro ao criar cliente.");
    }
  };

  const handleDelete = async (id) => {
  try {
    await api.delete(`/clients/${id}`);
    fetchClients();
  } catch (err) {
    setError("Erro ao deletar cliente.");
  }
};
    const handleEdit = (client) => {
        setEditingId(client.id);
        setName(client.name);
        setEmail(client.email);
        setPhone(client.phone || "");
    }
    
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Clientes</h2>

      {/* Formulário */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Telefone (opcional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">
            {editingId ? "Atualizar" : "Cadastrar"}
        </button>
      </form>

      {/* Mensagens */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Tabela de clientes */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone || "-"}</td>
            <td>
                <button onClick={() => handleEdit(client)}>Editar</button>
                <button onClick={() => handleDelete(client.id)}>Remover</button>            
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
