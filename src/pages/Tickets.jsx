import { useEffect, useState } from "react";
import api from "../services/api";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [clients, setClients] = useState([]);
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Aberto");
  const [clientId, setClientId] = useState("");
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchTickets = async () => {
    try {
      const res = await api.get("/tickets");
      setTickets(res.data);
    } catch (err) {
      setError("Erro ao carregar tickets.");
    }
  };

  const fetchClients = async () => {
    try {
      const res = await api.get("/clients");
      setClients(res.data);
    } catch (err) {
      setError("Erro ao carregar clientes.");
    }
  };

  useEffect(() => {
    fetchTickets();
    fetchClients();
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!clientId || !category || !content || !status) {
    setError("Todos os campos devem ser preenchidos.");
    return;
  }

  try {
    if (editingId) {
      await api.put(`/tickets/${editingId}`, {
        category,
        content,
        status,
      });
    } else {
      await api.post("/tickets", {
        category,
        content,
        status,
        client_id: parseInt(clientId, 10),
      });
    }

    setCategory("");
    setContent("");
    setStatus("Aberto");
    setClientId("");
    setEditingId(null);
    setError("");
    fetchTickets();
  } catch (err) {
    setError("Erro ao salvar ticket.");
    console.error(err.response?.data || err);
  }
};

const handleEdit = (ticket) => {
  setEditingId(ticket.id);
  setCategory(ticket.category);
  setContent(ticket.content);
  setStatus(ticket.status);
  setClientId(ticket.client_id.toString());
};

const handleDelete = async (id) => {
  try {
    await api.delete(`/tickets/${id}`);
    fetchTickets();
  } catch (err) {
    setError("Erro ao deletar ticket.");
  }
};


  return (
    <div style={{ padding: "2rem" }}>
      <h2>Tickets de Suporte</h2>

      {/* Formulário */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Conteúdo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Aberto">Aberto</option>
          <option value="Em Andamento">Em andamento</option>
          <option value="Fechado">Fechado</option>
        </select>
        <select
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          required
        >
          <option value="">Selecione um cliente</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
        <button type="submit">Criar Ticket</button>
        <button type="submit">
  {editingId ? "Atualizar Ticket" : "Criar Ticket"}
</button>
      </form>

      {/* Mensagens */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Tabela de tickets */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Categoria</th>
            <th>Conteúdo</th>
            <th>Status</th>
            <th>ID do Cliente</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.category}</td>
              <td>{ticket.content}</td>
              <td>{ticket.status}</td>
              <td>{ticket.client_id}</td>
                <td>
                  <button onClick={() => handleEdit(ticket)}>Editar</button>
                  <button onClick={() => handleDelete(ticket.id)}>Remover</button></td>            
                </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
