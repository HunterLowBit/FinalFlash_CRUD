import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const api = axios.create({
  baseURL: "http://localhost:3001/users",
});

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [form, setForm] = useState({ nome: "", email: "", senha: "", cpf: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddUser = async () => {
    try {
      const response = await api.post("/register", form);
      setUsers([...users, response.data]);
      setForm({ nome: "", email: "", senha: "", cpf: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditUser = async (id) => {
    try {
      const response = await api.put(`/${id}`, form);
      setUsers(users.map((user) => (user._id === id ? response.data : user)));
      setCurrentUser(null);
      setForm({ nome: "", email: "", senha: "", cpf: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await api.delete(`/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (currentUser) {
      handleEditUser(currentUser._id);
    } else {
      handleAddUser();
    }
  };

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setForm({ nome: user.nome, email: user.email, senha: "", cpf: user.cpf });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Management</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={form.senha}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={form.cpf}
            onChange={handleInputChange}
          />
          <button type="submit">
            {currentUser ? "Edit User" : "Add User"}
          </button>
        </form>
        <div className="user-list">
          {users.map((user) => (
            <div key={user._id} className="user-card">
              <h2>{user.nome}</h2>
              <p>{user.email}</p>
              <p>{user.cpf}</p>
              <button onClick={() => handleEditClick(user)}>Edit</button>
              <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
