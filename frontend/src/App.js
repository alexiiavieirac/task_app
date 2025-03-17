import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TaskDetails from "./pages/TaskDetails";
import Ranking from "./components/Ranking";
import "./index.css";

function App() {
  const [user, setUser] = useState(null); // Estado para gerenciar o usuário autenticado

  // Função para verificar se o usuário está autenticado
  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Rota de login */}
          <Route
            path="/login"
            element={
              isAuthenticated() ? (
                <Navigate to="/dashboard" /> // Redireciona para o dashboard se o usuário já estiver autenticado
              ) : (
                <Login setUser={setUser} /> // Passa a função setUser como prop
              )
            }
          />

          <Route
            path="/register"
            element={
                isAuthenticated() ? (
                    <Navigate to="/dashboard" />
                ) : (
                    <Register setUser={setUser} />
                )
            }   
          />

          {/* Rota do dashboard (protegida) */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated() ? (
                <Dashboard user={user} /> // Passa o usuário como prop
              ) : (
                <Navigate to="/login" /> // Redireciona para o login se o usuário não estiver autenticado
              )
            }
          />

          {/* Rota de detalhes da tarefa (protegida) */}
          <Route
            path="/tasks/:taskId"
            element={
              isAuthenticated() ? (
                <TaskDetails />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Rota do ranking (protegida) */}
          <Route
            path="/ranking"
            element={
              isAuthenticated() ? (
                <Ranking />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Rota padrão (redireciona para o dashboard) */}
          <Route
            path="/"
            element={
              isAuthenticated() ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;